const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

const corsConfig = {
  origin: ["http://localhost:3300", "http://localhost:3000"],
  credentials: true,
};

server.use(helmet());
server.use(cors(corsConfig));
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.use("/", (req, res) => {
  res.status(200).json({ api: `Up and Running` });
});

module.exports = server;
