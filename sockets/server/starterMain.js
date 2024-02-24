import { WebSocketServer } from "ws";

// Creating WebSocket server for publishers on port 8001
const publisherServer = new WebSocketServer({ port: 8001 });
// Creating WebSocket server for clients on port 8002
const clientServer = new WebSocketServer({ port: 8002 });

let clients = [];

// Handling new client connections
clientServer.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== ws);
  });
});

// Handling new publisher connections
publisherServer.on('connection', (ws) => {
  console.log('New publisher connected');

  ws.on('message', (data) => {
    console.log(`Message received from publisher: ${data}`);
    // Broadcasting message to all connected clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(`Sending message to client`);
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('Publisher disconnected');
  });
});

console.log('Publisher server running on port 8001');
console.log('Client server running on port 8002');