// Runs every example that has an expected.txt and compares its output.
// Usage: node scripts/check.mjs
//
// A folder is an example when it holds expected.txt and one of these entry files.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const runners = [
  { file: "Main.java", cmd: "java", args: ["Main.java"] },
  { file: "main.py", cmd: process.platform === "win32" ? "python" : "python3", args: ["main.py"] },
  { file: "main.js", cmd: "node", args: ["main.js"] },
];

function* exampleDirs(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  if (entries.some((e) => e.isFile() && e.name === "expected.txt")) yield dir;
  for (const e of entries) {
    if (e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules") {
      yield* exampleDirs(join(dir, e.name));
    }
  }
}

const tidy = (text) => text.replace(/\r\n/g, "\n").trimEnd();

let failed = 0;
let passed = 0;
for (const dir of exampleDirs(root)) {
  const name = relative(root, dir).replaceAll("\\", "/");
  const runner = runners.find((r) => existsSync(join(dir, r.file)));
  if (!runner) {
    console.log(`FAIL ${name}: expected.txt but no entry file`);
    failed++;
    continue;
  }
  const result = spawnSync(runner.cmd, runner.args, { cwd: dir, encoding: "utf8", timeout: 60_000 });
  const expected = tidy(readFileSync(join(dir, "expected.txt"), "utf8"));
  const actual = tidy(result.stdout ?? "");
  if (result.status === 0 && actual === expected) {
    console.log(`ok   ${name}`);
    passed++;
  } else {
    console.log(`FAIL ${name} (exit ${result.status})`);
    console.log("--- expected\n" + expected + "\n--- actual\n" + actual);
    if (result.stderr) console.log("--- stderr\n" + result.stderr.trimEnd());
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 || passed === 0 ? 1 : 0);
