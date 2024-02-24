const WebSocket = require('ws');
const { createWorker, distributeMessageInParallel } = require('./worker');

const clientServer = new WebSocket.Server({ port: 8002 });
let clients = [];

clientServer.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter((client) => client !== ws);
  });
});

const publisherServer = new WebSocket.Server({ port: 8001 });

publisherServer.on('connection', (ws) => {
  console.log('New publisher connected');

  ws.on('message', (data) => {
    console.log(`Message received from publisher: ${data}`);
    // Broadcasting message to all connected clients in parallel
    distributeMessageInParallel(data, clients, (confirmation) => {
      console.log(confirmation);
    });
  });

  ws.on('close', () => {
    console.log('Publisher disconnected');
  });
});

console.log('Publisher server running on port 8001');
console.log('Client server running on port 8002');