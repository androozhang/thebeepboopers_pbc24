import WebSocket from "ws";
import { performance } from "perf_hooks";

const publisherUrl = 'ws://localhost:8001';
const clientUrl = 'ws://localhost:8002';
const numClients = 1000;
let clients = [];
let messageReceivedPromises = [];

// Function to create a WebSocket client
function createClient(id) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(clientUrl);
    const messageReceivedPromise = new Promise((messageResolve) => {
      ws.on('message', (data) => {
        console.log(`Client ${id} received message:`, data.toString());
        messageResolve(); // Resolve when message is received
      });
    });
    messageReceivedPromises.push(messageReceivedPromise); // Add to array of promises

    ws.on('open', () => {
      console.log(`Client ${id} connected`);
      resolve(ws);
    });
    ws.on('error', (err) => {
      console.error(`Client ${id} connection error:`, err);
      reject(err);
    });
  });
}

// Function to create multiple WebSocket clients
async function createClients(num) {
  const promises = [];
  for (let i = 0; i < num; i++) {
    promises.push(createClient(i));
  }
  return Promise.all(promises);
}

// Function to send a message from the publisher
function publishMessage() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(publisherUrl);
    ws.on('open', () => {
      ws.send('Test message');
      console.log('Message published');
      resolve();
    });
    ws.on('error', (err) => {
      console.error('Publishing error:', err);
      reject(err);
    });
  });
}

// Benchmark function
async function benchmark() {
  console.log(`Creating ${numClients} clients...`);
  const startSetup = performance.now();
  clients = await createClients(numClients);
  const setupDuration = performance.now() - startSetup;
  console.log(`Setup completed in ${setupDuration}ms`);

  console.log('Starting benchmark...');
  const startBenchmark = performance.now();
  await publishMessage();
  await Promise.all(messageReceivedPromises); // Wait for all clients to receive the message
  const benchmarkDuration = performance.now() - startBenchmark;
  console.log(`Benchmark completed in ${benchmarkDuration}ms`);

  // Cleanup
  clients.forEach(client => client.close());
}

benchmark().catch(console.error);
