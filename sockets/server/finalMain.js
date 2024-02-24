const WebSocket = require('ws');
const { createWorker, distributeMessageInParallel } = require('./worker');

const clientServer = new WebSocket.Server({ port: 8002 });
let clients = [];

clientServer.on('connection', (ws) => {
  clients.push(ws);

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
  });
});

const publisherServer = new WebSocket.Server({ port: 8001 });

publisherServer.on('connection', (ws) => {

  ws.on('message', (data) => {
    // Broadcasting message to all connected clients in parallel
    distributeMessageInParallel(data, clients, (confirmation) => {
    });
  });

  ws.on('close', () => {
  });
});

console.log('Publisher server running on port 8001');
console.log('Client server running on port 8002');