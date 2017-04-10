'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const braceletusService = require('./server/braceletusService');


const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', (data, flags) => {
    console.log('message data:', data);

    const datum = data.split(',');

    console.log('split data', datum);

    if(datum[0] == '0') {
      braceletusService.manageStable(datum[1], datum[2]);
    } else if(datum[0] == '1') {
      braceletusService.manageRoom(datum[1], datum[2]);
    }
  });
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
