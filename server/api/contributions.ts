import { addContribution } from "../api-handlers/add_contribution";
import { getContribution } from "../api-handlers/get_contribution";
import { getContributions } from "../api-handlers/get_contributions";
import express from "express";
const { app, services } = require("../index");

const contributionsRouter = express.Router();
contributionsRouter.get("/", getContributions(services));
contributionsRouter.get("/:id", getContribution(services));
contributionsRouter.post("/", addContribution(services));

app.use("/contributions", contributionsRouter);

module.exports = app;
