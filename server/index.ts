import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
// import { addContribution } from "./api-handlers/add_contribution";
// import { getContributions } from "./api-handlers/get_contributions";
// import { getContribution } from "./api-handlers/get_contribution";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const port = 3001;

const prisma = new PrismaClient();
const services = { prisma };

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors(corsOptions));

// TODO: commmenting out to try vercel serverless,
// const contributionsRouter = express.Router();
// contributionsRouter.get("/", getContributions(services));
// contributionsRouter.get("/:id", getContribution(services));
// contributionsRouter.post("/", addContribution(services));
// app.use("/contributions", contributionsRouter);

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });

module.exports = { app, services };
