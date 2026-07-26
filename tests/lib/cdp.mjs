/* Minimal Chrome DevTools Protocol client.

   No dependencies: Node's global WebSocket drives a headless Chrome that is
   already on the machine. Nothing is installed, nothing is fetched, and the
   harness leaves no artifacts outside tests/artifacts/. */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium"
];

export function findChrome() {
  return CHROME_CANDIDATES.find((path) => {
    try {
      return statSync(path).isFile();
    } catch {
      return false;
    }
  });
}

export async function launchChrome() {
  const bin = findChrome();
  if (!bin) throw new Error("No Chrome/Chromium binary found.");

  const profile = mkdtempSync(join(tmpdir(), "muster-shell-"));
  const proc = spawn(
    bin,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      "--disable-lcd-text",
      "about:blank"
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  const wsUrl = await new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(
      () => reject(new Error("Chrome did not report a DevTools endpoint")),
      20000
    );
    proc.stderr.on("data", (chunk) => {
      buffer += chunk.toString();
      const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    proc.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited early (${code})`));
    });
  });

  const browser = await connect(wsUrl);

  return {
    browser,
    async close() {
      try {
        await browser.close();
      } catch {}
      const exited = new Promise((resolve) => proc.once("exit", resolve));
      proc.kill();
      await Promise.race([exited, new Promise((r) => setTimeout(r, 3000))]);
      try {
        rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
      } catch {
        /* Chrome still unwinding; the temp profile is the OS's to reap. */
      }
    }
  };
}

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let nextId = 1;
  const pending = new Map();
  const listeners = new Set();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
      return;
    }
    for (const listener of listeners) listener(message);
  });

  function send(method, params = {}, sessionId) {
    const id = nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify(payload));
    });
  }

  function on(handler) {
    listeners.add(handler);
    return () => listeners.delete(handler);
  }

  return {
    send,
    on,
    async newPage() {
      const { targetId } = await send("Target.createTarget", {
        url: "about:blank"
      });
      const { sessionId } = await send("Target.attachToTarget", {
        targetId,
        flatten: true
      });
      return makePage(send, on, sessionId, targetId);
    },
    async close() {
      socket.close();
    }
  };
}

function makePage(send, on, sessionId, targetId) {
  const requests = [];
  const consoleErrors = [];

  const off = on((message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === "Network.requestWillBeSent") {
      requests.push({
        url: message.params.request.url,
        type: message.params.type,
        initiator: message.params.initiator?.type
      });
    }
    if (message.method === "Runtime.exceptionThrown") {
      consoleErrors.push(
        message.params.exceptionDetails?.exception?.description ||
          message.params.exceptionDetails?.text ||
          "unknown exception"
      );
    }
    if (
      message.method === "Runtime.consoleAPICalled" &&
      message.params.type === "error"
    ) {
      consoleErrors.push(
        message.params.args.map((a) => a.value ?? a.description).join(" ")
      );
    }
  });

  const page = {
    targetId,
    requests,
    consoleErrors,
    call: (method, params) => send(method, params, sessionId),

    async init() {
      await page.call("Page.enable");
      await page.call("Runtime.enable");
      await page.call("Network.enable");
      await page.call("DOM.enable");
      await page.call("CSS.enable");
    },

    async setMedia({ colorScheme, reducedMotion, forcedColors }) {
      const features = [];
      if (colorScheme)
        features.push({ name: "prefers-color-scheme", value: colorScheme });
      if (reducedMotion)
        features.push({ name: "prefers-reduced-motion", value: reducedMotion });
      if (forcedColors)
        features.push({ name: "forced-colors", value: forcedColors });
      await page.call("Emulation.setEmulatedMedia", { media: "", features });
    },

    async setViewport({ width, height, deviceScaleFactor = 1, mobile = false }) {
      await page.call("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor,
        mobile
      });
    },

    async goto(url) {
      requests.length = 0;
      consoleErrors.length = 0;
      const loaded = new Promise((resolve) => {
        const stop = on((message) => {
          if (
            message.sessionId === sessionId &&
            message.method === "Page.loadEventFired"
          ) {
            stop();
            resolve();
          }
        });
      });
      await page.call("Page.navigate", { url });
      await loaded;
      // Let deferred scripts and the first frames settle.
      await page.eval("new Promise(r => requestAnimationFrame(() => setTimeout(r, 120)))");
    },

    async eval(expression) {
      const result = await page.call("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true
      });
      if (result.exceptionDetails) {
        throw new Error(
          result.exceptionDetails.exception?.description ||
            result.exceptionDetails.text
        );
      }
      return result.result.value;
    },

    async screenshot({ fullPage = false } = {}) {
      const params = { format: "png" };
      if (fullPage) params.captureBeyondViewport = true;
      const { data } = await page.call("Page.captureScreenshot", params);
      return Buffer.from(data, "base64");
    },

    async close() {
      off();
      await send("Target.closeTarget", { targetId });
    }
  };

  return page;
}
