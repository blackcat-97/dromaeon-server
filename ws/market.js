import { users, addUser, removeUser } from "../utils/market-users.js";

export const market = (socket) => {
  socket.on("join-market", (userId) => {
    socket.join("market");
    console.log("joined market!", userId);
    addUser({ id: userId, socket: socket.id });
  });
};
