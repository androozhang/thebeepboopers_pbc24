import WebSocket from "ws";

// Function to generate a random string of length 1024
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Connect to the WebSocket server for publishers
const ws = new WebSocket('ws://localhost:8001');

ws.on('open', function open() {
  console.log('Connected to the server as publisher');

  // Send a message every 10 seconds
  setInterval(() => {
    const message = {
      author: Math.floor(Math.random() * 1000), // Random author ID
      data: generateRandomString(1024) // Random string of length 1024
    };
    ws.send(JSON.stringify(message));
    console.log('Message sent:', message);
  }, 10000);
});

ws.on('close', function close() {
  console.log('Disconnected from the server');
});

ws.on('error', function error(err) {
  console.error('Connection error:', err);
});
