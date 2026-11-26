# c3-examples

Runnable code from [CodeCanvas Collective](https://codecanvascollective.com) posts.
Each example runs with one command. CI runs every example that has an `expected.txt` on each push and checks its output.

## Examples

| Topic | Languages | Folder |
|---|---|---|
| SOLID · Open/closed principle | Java · Python · JavaScript | [design/solid/02-open-closed](design/solid/02-open-closed/) |
| Node.js API from zero · Episode 1: your first HTTP server | Node.js | [nodejs-api/01-first-http-server](nodejs-api/01-first-http-server/) |
| Node.js API from zero · Episode 2: routes and HTTP methods | Node.js | [nodejs-api/02-routes-and-methods](nodejs-api/02-routes-and-methods/) |
| Python tips: `zip`, `enumerate` vs `range`, variable names | Python | [python/tips](python/tips/) |
| Python built-ins: `abs` | Python | [python/built-in-functions](python/built-in-functions/) |

## Run an example

Every example folder has a single entry file and an `expected.txt` with its output:

```bash
java Main.java     # Java 11 or later runs a single source file directly
python main.py
node main.js
```

To check every example at once (needs Java, Python and Node.js):

```bash
node scripts/check.mjs
```

## Layout

- `design/`, and other topic folders: one idea, one folder per language.
- `nodejs-api/`: the "Node.js API from zero" series, one folder per episode. Each has a `test/` folder.
- `python/`, `javascript/` …: tips about one language.

Tested with Java 26, Python 3.13 and Node.js 22.

## Licence

[MIT](LICENSE)
