// Test for episode 1: start server.js, call it, and print what comes back.
// scripts/check.mjs compares this output with expected.txt.

import { startServer } from "../../start-server.mjs";

const { url, stop } = await startServer(new URL("../server.js", import.meta.url));

// One function answers every request, so every path gets the same reply.
for (const path of ["/", "/anything"]) {
  const res = await fetch(url + path);
  console.log(`GET ${path} -> ${res.status} ${await res.text()}`);
}

stop();
