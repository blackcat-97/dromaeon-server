import { getUser } from "../utils/global-users.js";

export const message = (socket) => {
  socket.on("private-message", ({ message, to }) => {
    const user = getUser(to);
    console.log(user);
    socket.to(user.socket).emit("private-message", { message });
  });
};

export const joinChatServer = (socket, server) => {
  socket.join(server);

  socket.on("message", (message) => {
    console.log("server_id", message);
    socket.broadcast.to(server).emit("message", message);
  });

  socket.on("quit-server", (roomId) => {
    socket.leave(roomId);
  });
};
