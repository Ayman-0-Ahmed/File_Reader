const WebSocket = require('ws');

const targetUrl = process.env.TARGET_URL || 'ws://localhost:8080';
const ws = new WebSocket(targetUrl);

ws.on('open', () => {
  console.log('Connected to listener');
  ws.send('run demo_task');
});

ws.on('message', msg => {
  console.log('Received reply:', msg.toString());
});
