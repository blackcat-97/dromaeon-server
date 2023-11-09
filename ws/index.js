import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import { global } from "./global.js";
import { market } from "./market.js";
import { explorer } from "./explorer.js";

export const app = express();

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  global(socket, io);
  market(socket);
  explorer(socket);

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("disconnect", () => {
    delete io.sockets.sockets[socket.id];
  });
});
