import http from "http";
import { Server } from "socket.io";
import { assignUserName, currentUsers, removeUserName } from "./userGenerator";


export const startWebSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuario conectado");
    assignUserName(socket.id);
    socket.emit('setUsername', currentUsers.find(user => user.id === socket.id)?.username);

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
      removeUserName(socket.id);
    });

    socket.on("message", (message) => {
      const username = currentUsers.find(user => user.id === socket.id)?.username as string;
      console.log(`Mensaje de ${username}: ${message}`);
      io.emit("message", `${username}: ${message}`);
    });
  });
}
