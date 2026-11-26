# Node.js API from zero

The code for the CodeCanvas Collective series "Node.js API from zero": one small tasks API,
built in 10 weekly steps. Each folder holds the code exactly as it is at the end of that episode.

| Episode | What you build | Folder |
|---|---|---|
| 1 | Your first HTTP server | [01-first-http-server](01-first-http-server/) |
| 2 | Routes and HTTP methods | [02-routes-and-methods](02-routes-and-methods/) |

A new folder arrives with each episode.

## Run an episode

You need [Node.js](https://nodejs.org) and nothing else: the first episodes use no packages.

```bash
cd 01-first-http-server
node server.js
```

Then, in a second terminal:

```bash
curl http://localhost:3000
```

Stop the server with Ctrl+C.

## Tests

Each episode has a `test/` folder: `main.js` starts the server, sends a few requests and prints
the replies; `expected.txt` holds what it should print.

```bash
cd 01-first-http-server/test
node main.js
```

The tests don't use port 3000. [start-server.mjs](start-server.mjs) starts the same `server.js`
on a free port, so a test never clashes with something else on your machine.
(The server still prints "Listening on port 3000": that message is part of `server.js`.)

Checked with Node.js 22.
