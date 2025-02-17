import http from "http";
import { Server } from "socket.io";


export const startWebSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });

    socket.on("message", (message) => {
      console.log("Mensaje recibido:", message);
      io.emit("message", message);
    });
  });
}