import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3002 });
 
interface User {
  socket: WebSocket;
  name: string;
  room: string | null;
}

interface Room {
  name: string;
  members: User[];
}

let allSockets: User[] = [];
let rooms: Room[] = [];

wss.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    let parsedMessage: any;
    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (err) {
      console.error(" Invalid JSON received:", message);
      return;
    }

    // CREATE ROOM
    if (parsedMessage.type === "createRoom") {
      const { room } = parsedMessage.payload;
      if (rooms.find((r) => r.name === room)) {
        socket.send(JSON.stringify({
          type: "error",
          payload: { message: `Room ${room} already exists` }
        }));
        return;
      }
      rooms.push({ name: room, members: [] });
      socket.send(JSON.stringify({
        type: "roomCreated",
        payload: { room }
      }));
      console.log(`Room created: ${room}`);
    }

    // JOIN ROOM
    if (parsedMessage.type === "join") {
      const { name, room } = parsedMessage.payload;
      let user = allSockets.find((u) => u.socket === socket);

      if (!user) {
        user = { socket, name, room };
        allSockets.push(user);
      } else {
        user.name = name;
        user.room = room;
      }

      let targetRoom = rooms.find((r) => r.name === room);
      if (!targetRoom) {
        targetRoom = { name: room, members: [] };
        rooms.push(targetRoom);
      }
      targetRoom.members.push(user);

      console.log(`${name} joined room ${room}`);

      socket.send(JSON.stringify({
        type: "joinedRoom",
         room, 
         name 
      }));
    }

    // CHAT
    if (parsedMessage.type === "chat") {
      const currentUser = allSockets.find((u) => u.socket === socket);
      if (!currentUser || !currentUser.room) return;

      const room = rooms.find((r) => r.name === currentUser.room);
      if (!room) return;

      for (let member of room.members) {
        member.socket.send(JSON.stringify({
          payload: {
             name: currentUser.name,
             message: parsedMessage.payload.message,
            room: currentUser.room,
          },
           
          
        }));
      }
    }
  });

  socket.on("close", () => {
    const user = allSockets.find((u) => u.socket === socket);
    if (user) {
      console.log(`${user.name} left room ${user.room}`);
      if (user.room) {
        const room = rooms.find((r) => r.name === user.room);
        if (room) {
          room.members = room.members.filter((m) => m.socket !== socket);
          if (room.members.length === 0) {
            // auto delete empty rooms
            rooms = rooms.filter((r) => r.name !== room.name);
            console.log(`🗑️ Room deleted: ${room.name}`);
          }
        }
      }
    }
    allSockets = allSockets.filter((u) => u.socket !== socket);
  });
});
