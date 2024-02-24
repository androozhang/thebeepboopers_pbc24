import WebSocket from "ws";
import { performance } from "perf_hooks";

const publisherUrl = 'ws://localhost:8001';
const clientUrl = 'ws://localhost:8002';
const numClients = 1000;
const numPublishers = 1000;

let clients = [];
let messageReceivedPromises = [];

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to create a WebSocket client
function createClient(id) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(clientUrl);
    const messageReceivedPromise = new Promise((messageResolve) => {
      ws.on('message', (data) => {
        messageResolve(); // Resolve when message is received
      });
    });
    messageReceivedPromises.push(messageReceivedPromise); // Add to array of promises

    ws.on('open', () => {
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

// Function to send a message from a publisher
function publishMessage(publisherId) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(publisherUrl);
    ws.on('open', () => {
      const message = {
        author: publisherId, // Use publisherId as author
        data: generateRandomString(1024) // Random string of length 1024
      };
      ws.send(JSON.stringify(message));
      resolve();
    });
    ws.on('error', (err) => {
      console.error(`Publisher ${publisherId} publishing error:`, err);
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
  
  // Create and run publishers concurrently
  const publisherPromises = [];
  for (let i = 0; i < numPublishers; i++) {
    publisherPromises.push(publishMessage(i));
  }
  
  // Wait for all publishers and clients to finish
  await Promise.all([...publisherPromises, ...messageReceivedPromises]);
  
  const benchmarkDuration = performance.now() - startBenchmark;
  console.log(`Benchmark completed in ${benchmarkDuration}ms`);

  // Cleanup
  clients.forEach(client => client.close());
}

benchmark().catch(console.error);