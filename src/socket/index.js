module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });
    socket.on("send-message", (message) => {
      socket.to(message.roomId).emit("receive-message", message);
    });
  });
};
