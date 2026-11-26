import http from "node:http";

function handle(req, res) {
  res.end("Hello from Node.js");
}

const server = http.createServer(handle);
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
