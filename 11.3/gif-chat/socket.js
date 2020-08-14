const SocketIO = require("socket.io");
const socket = require("../../11.2/gif-chat/socket");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);

    io.on("disconnect", () => {
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(ws.interval);
    });

    io.on("error", (error) => {
      console.error(error);
    });

    io.on("reply", (data) => {
      console.log(data);
    });

    socket.interval = setInterval(() => {
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });
};
