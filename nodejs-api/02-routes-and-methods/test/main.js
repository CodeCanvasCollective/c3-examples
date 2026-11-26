// Test for episode 2: start server.js, send a few requests, and print what comes back.
// scripts/check.mjs compares this output with expected.txt.

import { startServer } from "../../start-server.mjs";

const { url, stop } = await startServer(new URL("../server.js", import.meta.url));

const requests = [
  ["GET", "/tasks"],            // the one route we have
  ["GET", "/tasks?done=false"], // the query string is dropped, so it's the same route
  ["GET", "/users"],            // no such route
  ["POST", "/tasks"],           // right path, wrong method (POST arrives in episode 3)
  ["GET", "/tasks/"],           // "/tasks/" is a different string from "/tasks"
];

for (const [method, path] of requests) {
  const res = await fetch(url + path, { method });
  const type = res.headers.get("content-type");
  console.log(`${method} ${path} -> ${res.status} ${type} ${await res.text()}`);
}

stop();
