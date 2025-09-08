import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 3002});

wss.on("connection", (socket)=> {
    console.log("Client connected");
})