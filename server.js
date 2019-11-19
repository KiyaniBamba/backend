const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./users/user-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "SERVER IS WORKING" });
});

module.exports = server;
