import express from "express";
import { createServer, METHODS } from "node:http";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js"; 

const app = express();
const server = createServer(app);
const io = connectToSocket(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true 
  }
});

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
  const connectionDB = await mongoose.connect(
    "mongodb+srv://uniqueness1924_db_user:oLfahBRailJgmmEh@videocall.lb30hpn.mongodb.net/",
  );
  console.log(`MONGO connected DB Host: ${connectionDB.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Listening on port 8000");
  });
};

start();
