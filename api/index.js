const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer();
const request = require('request-promise-native');
const triMetEndpoint = 'https://developer.trimet.org/ws/v2/vehicles&appID=C1D41D0C4BBC0BCC3147CB5DB';
app.use(express.static(path.join(__dirname, '../web')));

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  const id = setInterval(async () => {
    try {
      const transitData = await request(triMetEndpoint);
    ws.send(transitData);
    } catch (err) {
      console.log('error: ', err);
    }
  }, 800);
  console.log('started client interval');
  ws.on('close', () => {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.on('request', app);
server.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
