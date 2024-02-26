const WebSocket = require('ws');
const os = require('os');
const { createWorker, distributeMessageInParallel } = require('./worker');

const clientServer = new WebSocket.Server({ port: 8002 });
let clients = [];
let workers = [];
const numCPUs = os.cpus().length;
for (let i = 0; i < numCPUs; i++) {
  workers.push(createWorker());
}
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
    let section = Math.floor(clients.length / numCPUs);
    let remainder = clients.length % numCPUs;

    for (let i = 0; i < numCPUs; i++) {
      let start = i * section + Math.min(i, remainder);
      let end = (i + 1) * section + Math.min(i + 1, remainder);

      distributeMessageInParallel(data, clients.slice(start, end), workers[i], (confirmation) => {
        console.log(confirmation);
      });
    }

  });

  ws.on('close', () => {
    console.log('Publisher disconnected');
  });
});

console.log('Publisher server running on port 8001');
console.log('Client server running on port 8002');