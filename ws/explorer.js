import {
  addUser,
  updateUser,
  removeUserByID,
  users,
} from "../utils/explorer-users.js";

export const explorer = (socket) => {
  socket.on("connect-exploer", ({ id, x, y, name, ...extra }) => {
    socket.join("explorer");

    addUser({ userId: id, x, y, _id: socket.id, name });
    
    socket.on("user-list", (id) => {
      console.log(id)
      socket.emit(
        "user-list",
        users.filter((item) => item.id !== id)
      );
    });

    socket.broadcast.to("explorer").emit("join", { id, x, y, name, ...extra });

    socket.on("update", (user) => {
      socket.broadcast.to("explorer").emit("update", user);
      updateUser(user);
    });

    socket.on("move", (user) => {
      updateUser(user);
      socket.broadcast.to("explorer").emit("move", user);
    });

    socket.on("stop", (id) => {
      socket.broadcast.to("explorer").emit("stop", id);
    });

    socket.on("quit", (id) => {
      removeUserByID(id);
      socket.leave("explorer");
      socket.broadcast.to("explorer").emit("remove-player", id);
    });

    socket.on("delete-egg", (id) => {
      socket.broadcast.to("explorer").emit("delete-egg", id);
    });
  });
};
