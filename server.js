const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);


  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('join', (roomId) => {
      socket.join(roomId);
    });
  
    socket.on('message', (message) => {
      io.to(message.receiverRoomId).emit('message', message.message);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // io.on("connection", (socket) => {
  //   console.log(socket.id + " is connected");
  //   socket.emit('welcome',"Welcome to socket iom server ")
  //   socket.on("message", ({ room, message }) => {
  //     console.log(room , message , "::::::");
  //     const messageData = { user: room, message };
  //     socket.to(room).emit("receive-message", messageData);
  //     console.log(`Message sent to room ${room}:`, messageData);
  //   });

  //   socket.on("join-room", (room) => {
  //     socket.join(room);
  //     console.log(`User joined room ${room}`);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("A user disconnected!");
  //   });
  // });
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
