const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./users/user-route");
const restaurantRouter = require("./restaurants/restaurant-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/user", userRouter);
server.use("/api/restaurant", restaurantRouter);

server.use("/api/auth", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "SERVER IS WORKING" });
});

module.exports = server;
