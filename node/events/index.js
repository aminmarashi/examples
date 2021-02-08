const express = require("express");
const { exit } = require("process");
const { EventEmitter } = require("ws");
const app = express();
const ews = require("express-ws")(app);

const events = new EventEmitter();

const connections = new Set();

events.on("broadcast", ({ connection, msg }) => {
    console.log('Event received: %s', msg)

    connections.forEach((element) => {
        if (element !== connection) element.send(msg);
    });
});

app.ws("/", (ws, req) => {
    if (!connections.has(ws)) {
        connections.add(ws, ws);
        console.log('New client connected, open connections: %s', connections.size)
    }
    ws.on("close", () => {
        connections.delete(ws);
        console.log('Connection closed, open connections: %s', connections.size)
    });
    ws.on("message", (msg) => {
        console.log('Message received: %s', msg)
        events.emit("broadcast", { connection: ws, msg });
    });
});

process.on('SIGINT', () => {
    console.log('Disconnecting %s clients', connections.size)
    ews.getWss().close();
    exit(0);
})

app.listen(8080, console.log);