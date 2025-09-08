import {WebSocketServer, WebSocket} from "ws";

const wss = new WebSocketServer({port: 3002});

let allSockets: WebSocket[] = [];

wss.on("connection", (socket)=> {
    allSockets.push(socket);
    console.log("Client connected");

    socket.on("message", (message) => {
        console.log("Received:", message.toString());
        allSockets.forEach(s => s.send(message.toString() + " from server"));
    })
    socket.on("disconnect", () => {
    allSockets = allSockets.filter(s => s != socket);
    });
})

