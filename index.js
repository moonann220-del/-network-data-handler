const { WebSocketServer } = require('ws');
const port = process.env.PORT || 8080;

const wss = new WebSocketServer({ port }, () => {
    console.log(`Relay is active and running on port ${port}`);
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast discovery packets out to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(message);
            }
        });
    });
});
