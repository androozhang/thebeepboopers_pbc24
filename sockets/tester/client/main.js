import WebSocket from "ws";

// Connect to the WebSocket server for clients
const ws = new WebSocket('ws://localhost:8002');

ws.on('open', function open() {
  console.log('Connected to the server');
});

ws.on('message', function incoming(data) {
  console.log('Message from server:', data.toString());
});

ws.on('close', function close() {
  console.log('Disconnected from the server');
});

ws.on('error', function error(err) {
  console.error('Connection error:', err);
});
