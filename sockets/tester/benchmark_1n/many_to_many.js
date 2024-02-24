import WebSocket from "ws";
import { performance } from "perf_hooks";

const publisherUrl = 'ws://localhost:8001';
const clientUrl = 'ws://localhost:8002';
const numClients = 1000;
const numPublishers = 1000;

let clients = [];
let messageReceivedCounts = [];

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
    const messageReceivedCount = 0; // Initialize received message count
    messageReceivedCounts.push(messageReceivedCount); // Add to message count array

    ws.on('message', (data) => {
      messageReceivedCounts[id]++; // Increment received message count for client
    });

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
      console.log(`Publisher ${publisherId} published message`);
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

  // Wait for all publishers to finish
  await Promise.all(publisherPromises);

  // Wait for all clients to receive expected number of messages
  const expectedMessagesPerClient = numPublishers; // Assuming each client receives from all publishers
  const clientsFinished = [];
  for (let i = 0; i < numClients; i++) {
    while (messageReceivedCounts[i] < expectedMessagesPerClient) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait briefly for messages
    }
    clientsFinished.push(i); // Mark client as finished
  }

  const benchmarkDuration = performance.now() - startBenchmark;
  console.log(`Benchmark completed in ${benchmarkDuration}ms`);

  // Cleanup
  clients.forEach(client => client.close());
  console.log(`All clients received ${expectedMessagesPerClient} messages each.`);
  console.log(`Clients finished in order: ${clientsFinished.join(', ')}`);
}


benchmark().catch(console.error);