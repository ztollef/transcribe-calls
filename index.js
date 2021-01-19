const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3000;

//Configure Transcription Request

//Handle Web Socket Connection
wss.on("connection",  function connection(ws) {
    console.log("New Connection Initiated")

    ws.on("message", function connection(ws) {
        const msg = JSON.parse(message);
        switch (msg.event) {
            case "connected":
                console.log("A new call has connected");
                break;
            case "start":
                console.log(`Starting Media Stream ${msg.start}`);
                break;
            case "media":
                console.log("Receiving audio...");
                break;
            case "stop":
                console.log("Call has ended");
                break;
        }
    });
});

//Handle HTTP Request 
app.get('/', (req, res) => res.send("Testing for websockets..."));

app.post('/', (req, res) => {
    res.set("Content-Type", "text/xml");

    res.send(`
    <Response>
        <Start>
            <Stream url="wss://${req.headers.host}/"/>
        </Start>
        <Say> I will stream the next 60 seconds of audio through the websocket </Say>
        <Pause length="60" />
    </Response>
    `);
})

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
  })
