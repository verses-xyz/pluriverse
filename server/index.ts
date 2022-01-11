import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { addContribution } from "./api-handlers/add_contribution";
import { getContributions } from "./api-handlers/get_contributions";
import { getContribution } from "./api-handlers/get_contribution";
import { verify } from "./api-handlers/twitter-verify";
import { addSignature } from "api-handlers/add_user";
// import contributions from "./api/contributions";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const port = process.env.PORT || 3001;

const prisma = new PrismaClient();
const services = { prisma };

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors(corsOptions));
// app.use("/api/contributions", contributions)

const usersRouter = express.Router();
usersRouter.post("/", addSignature(services));
app.use("/users", usersRouter);

const contributionsRouter = express.Router();
contributionsRouter.get("/", getContributions(services));
contributionsRouter.get("/:id", getContribution(services));
contributionsRouter.post("/", addContribution(services));
app.use("/contributions", contributionsRouter);

const twitterRouter = express.Router();
twitterRouter.post("/verify/:handle", verify(services));
app.use("/twitter", twitterRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// This is used for vercel serverless. currently we are using a serverful express though.
// export default { app, services };
