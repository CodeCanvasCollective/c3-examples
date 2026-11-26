import http from "node:http";

const tasks = [
  { id: 1, title: "Learn Node.js" },
  { id: 2, title: "Build an API" },
];

function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(data));
}

function handle(req, res) {
  const path = req.url.split("?")[0];
  const route = `${req.method} ${path}`;

  if (route === "GET /tasks") {
    return send(res, 200, tasks);
  }
  send(res, 404, { error: "Not found" });
}

const server = http.createServer(handle);
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
