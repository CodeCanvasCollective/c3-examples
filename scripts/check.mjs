// Checks that every example still prints what it should.
//
// How it works:
//   1. Look through the repo for folders that have an expected.txt file.
//   2. Run the program in that folder (Main.java, main.py or main.js).
//   3. Compare what the program printed with expected.txt.
//   4. Print "ok" or "FAIL" for each folder, then a total.
//
// Run it:  node scripts/check.mjs
// GitHub Actions runs it on every push and pull request (.github/workflows/test.yml).
// To add an example: put the program and its expected.txt in a folder. Nothing to change here.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// The repo folder: one level up from this script's folder (scripts/).
const root = fileURLToPath(new URL("..", import.meta.url));

// Which program file we look for, and the command that runs it.
// On Linux (GitHub Actions) Python is "python3"; on Windows it's "python".
const runners = [
  { file: "Main.java", cmd: "java", args: ["Main.java"] },
  { file: "main.py", cmd: process.platform === "win32" ? "python" : "python3", args: ["main.py"] },
  { file: "main.js", cmd: "node", args: ["main.js"] },
];

// Walks through every folder under `dir`, one by one, and hands back each folder
// that contains an expected.txt. Skips hidden folders (.git, .github) and node_modules.
function* exampleDirs(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  if (entries.some((e) => e.isFile() && e.name === "expected.txt")) yield dir;
  for (const e of entries) {
    if (e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules") {
      yield* exampleDirs(join(dir, e.name));
    }
  }
}

// Makes two outputs fair to compare: Windows line endings (\r\n) become \n,
// and blank lines or spaces at the very end are dropped.
const tidy = (text) => text.replace(/\r\n/g, "\n").trimEnd();

let failed = 0;
let passed = 0;

for (const dir of exampleDirs(root)) {
  // A short name for the report, e.g. "design/solid/02-open-closed/java/right"
  const name = relative(root, dir).replaceAll("\\", "/");

  // Find the program in this folder. No program means the folder is set up wrong.
  const runner = runners.find((r) => existsSync(join(dir, r.file)));
  if (!runner) {
    console.log(`FAIL ${name}: expected.txt but no entry file`);
    failed++;
    continue;
  }

  // Run the program inside its own folder and capture what it prints.
  // It gets 60 seconds; a program that hangs counts as a fail.
  const result = spawnSync(runner.cmd, runner.args, { cwd: dir, encoding: "utf8", timeout: 60_000 });

  const expected = tidy(readFileSync(join(dir, "expected.txt"), "utf8"));
  const actual = tidy(result.stdout ?? "");

  // Pass only if the program finished without an error (exit code 0)
  // AND printed exactly what expected.txt says.
  if (result.status === 0 && actual === expected) {
    console.log(`ok   ${name}`);
    passed++;
  } else {
    // Show both outputs (and any error) so it's easy to see what changed.
    console.log(`FAIL ${name} (exit ${result.status})`);
    console.log("--- expected\n" + expected + "\n--- actual\n" + actual);
    if (result.stderr) console.log("--- stderr\n" + result.stderr.trimEnd());
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);

// Exit code 1 tells GitHub Actions the check failed (a red cross on the PR).
// Finding no examples at all also counts as a failure, so a broken search can't pass quietly.
process.exit(failed > 0 || passed === 0 ? 1 : 0);
