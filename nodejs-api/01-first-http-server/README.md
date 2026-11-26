# Episode 1 · Your first HTTP server

A web server in 10 lines of JavaScript. No packages: `node:http` is built into Node.js.

## Set up from scratch

```bash
node -v                     # check Node.js is installed
npm init -y                 # create package.json
npm pkg set type=module     # so we can use "import"
```

Then write [server.js](server.js). Or use this folder as it is.

## Run it

```bash
node server.js
```

```
Listening on port 3000
```

In a second terminal:

```bash
curl http://localhost:3000
```

```
Hello from Node.js
```

## What to notice

- `http.createServer(handle)` makes the server. `handle` runs once for every request.
- `res.end(...)` sends the reply. Leave it out and the request just hangs.
- Every path gets the same reply for now (`/`, `/anything`, …). Routes come in episode 2.
- The status is 200 because that is Node's default when you don't set one.
- The reply is plain text with no `Content-Type` header. JSON and headers come in episode 2.

Next: [episode 2, routes and HTTP methods](../02-routes-and-methods/).
