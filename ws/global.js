import {
  users,
  addUser,
  removeUser,
  removeUserBySocketID,
  getUser,
} from "../utils/global-users.js";

export const global = (socket, io) => {
  socket.on("connect-app", (userID) => {
    addUser({ id: userID, socket: socket.id });
    console.log("new user connected", users);
  });

  socket.emit("userlist", users);

  // market server
  socket.on("add-egg-market", (egg) => {
    console.log("new egg", egg);
    socket.broadcast.to("market").emit("add-egg-market", egg);
  });

  socket.on("delete-egg-market", (eggId) => {
    socket.broadcast.to("market").emit("delete-egg-market", eggId);
  });

  // inventory server
  socket.on("add-egg-inventory", ({ egg, buyer }) => {
    const user = getUser(buyer);
    console.log("inventory", egg, user);
    socket.to(user.socket).emit("add-egg-inventory", egg);
  });

  socket.on("send-notification", ({ id, message }) => {
    console.log("notification", message);
    const user = getUser(id);
    console.log(Array.from(io.sockets.sockets.keys()));
    console.log("socket_id", user.socket);
    if (io.sockets.sockets[user.socket]) {
      console.log("exist!");
    } else {
      console.log("doesn't exist!");
    }
    socket.to(user.socket).emit("send-notification", message);
  });

  socket.on("disconnect", () => {
    removeUserBySocketID(socket.id);
  });
};
