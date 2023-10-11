import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import {
  addUser,
  updateUser,
  removeUser,
  removeUserByID,
  users,
} from "../utils/userlist.js";

export const app = express();

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection established", socket.id);

  socket.on("join", ({ id, x, y, ...extra }) => {
    socket.join("egg");

    socket.emit("user-list", users);
    console.log(users.length);

    addUser({ userId: id, x, y, _id: socket.id });
    socket.broadcast.to("egg").emit("join", { id, x, y, ...extra });

    socket.on("update", (user) => {
      socket.broadcast.to("egg").emit("update", user);
      updateUser(user);
    });

    socket.on("move", (user) => {
      socket.broadcast.to("egg").emit("move", user);
    });

    socket.on("stop", (id) => {
      socket.broadcast.to("egg").emit("stop", id);
    });

    socket.on("quit", (id) => {
      removeUserByID(id);
      socket.broadcast.to("egg").emit("quit", id);
    });

    socket.on("delete-egg", (id) => {
      socket.broadcast.to("egg").emit("delete-egg", id);
    });
  });

  socket.on("disconnect", () => {
    const user = users.find((item) => item._id === socket.id);
    if (user) {
      socket.broadcast.to("egg").emit("quit", user.id);
      removeUser(socket.id);
    }
  });
});
