// Test helper: starts an episode's server.js on a free port instead of port 3000.
//
// Why: every server.js in this series listens on port 3000, as in the lessons.
// A test must not depend on that port, because something else may be using it
// (another app on your machine, for example). So for the test only, we swap
// the port number for 0, which means "give me any free port".
//
// The server.js file itself is not changed. It runs exactly as it is written.

import http from "node:http";
import { once } from "node:events";

export async function startServer(serverFileUrl) {
  // 1. Wrap Node's own listen() for a moment: remember which server called it,
  //    and pass port 0 in place of the port the server asked for.
  const realListen = http.Server.prototype.listen;
  let server;
  http.Server.prototype.listen = function (port, ...rest) {
    server = this;
    return realListen.call(this, 0, ...rest);
  };

  // 2. Load server.js. It creates the server and calls listen(), as usual.
  await import(serverFileUrl.href);

  // 3. Put the real listen() back, and wait until the server is ready.
  http.Server.prototype.listen = realListen;
  if (!server.listening) await once(server, "listening");

  // 4. Hand the test the address to call, and a way to stop the server.
  const url = `http://127.0.0.1:${server.address().port}`;
  const stop = () => {
    server.close();
    server.closeAllConnections();
  };
  return { url, stop };
}
