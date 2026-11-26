# Episode 2 · Routes and HTTP methods

In [episode 1](../01-first-http-server/) the server sent the same reply to every request.
Now it has a route: `GET /tasks` returns a list of tasks as JSON, and anything else gets a 404.

A route is the method plus the path. In [server.js](server.js):

1. Read `req.method` and `req.url`.
2. Drop the query string: `req.url.split("?")[0]`.
3. Compare one string: `route === "GET /tasks"`.
4. Reply with JSON, or a 404 for anything else.

## Run it

```bash
node server.js
```

In a second terminal:

```bash
curl http://localhost:3000/tasks
```

```
[{"id":1,"title":"Learn Node.js"},{"id":2,"title":"Build an API"}]
```

```bash
curl -i http://localhost:3000/users
```

```
HTTP/1.1 404 Not Found
Content-Type: application/json
…
{"error":"Not found"}
```

## What to notice

- **`return` after you send the reply.** Without it, the code carries on to the 404 line and
  tries to reply twice. A `GET /tasks` request then crashes the server with
  `Error [ERR_HTTP_HEADERS_SENT]: Cannot write headers after they are sent to the client`.
- `send()` sets the status and the `Content-Type` header, then turns the data into JSON text.
- `GET /tasks?done=false` returns the same list: the query string is dropped before matching.
- `GET /tasks/` (with a slash at the end) is a 404, because `"/tasks/"` is a different string.
  That keeps the code simple for now.
- `POST /tasks` is a 404 for now. Strictly, a server that has `/tasks` but not `POST` should
  answer 405 Method Not Allowed. `POST` arrives in episode 3 and proper error replies in episode 4.
- `split("?")[0]` is enough here. `new URL(req.url, "http://localhost")` is the fuller way to
  read a URL in Node.js.
