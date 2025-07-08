// backend/wsServer.js
const http = require("http");
const WebSocket = require("ws");
const url = require("url");

const server = http.createServer(); // we will attach WebSocket here
const wss = new WebSocket.Server({ noServer: true });

const rooms = {}; // { roomId: Set of sockets }

wss.on("connection", (ws, req, roomId, username) => {
  console.log(`🟢 ${username} connected to room ${roomId}`);

  if (!rooms[roomId]) rooms[roomId] = new Set();
  rooms[roomId].add(ws);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    const msg = {
      username: username,
      message: data.message,
      timestamp: new Date().toISOString()
    };

    // Broadcast to all clients in the same room
    rooms[roomId].forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  });

  ws.on("close", () => {
    console.log(`🔴 ${username} left room ${roomId}`);
    rooms[roomId].delete(ws);
    if (rooms[roomId].size === 0) delete rooms[roomId];
  });
});

// Upgrade HTTP to WS
server.on("upgrade", (req, socket, head) => {
  const query = url.parse(req.url, true).query;
  const { roomId, username } = query;

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req, roomId, username);
  });
});

server.listen(5001, () => {
  console.log("WebSocket server listening on ws://localhost:5001");
});
