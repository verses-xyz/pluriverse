import express from "express";
import { PrismaClient } from "@prisma/client";
import { addContribution } from "./api/add_contribution";
import { getContributions } from "./api/get_contributions";

const app = express();
app.use(express.json());
const port = 3001;

const prisma = new PrismaClient();
const services = { prisma };

const contributionsRouter = express.Router();
contributionsRouter.get("/", getContributions(services));
contributionsRouter.get("/:id", () => {});
contributionsRouter.post("/", addContribution(services));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/contributions", contributionsRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
