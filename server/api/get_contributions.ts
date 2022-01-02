// GET /contributions

import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { Services } from "../types";
import { GetContributionsRequest } from "../types/server-api";

const Limit = 500;

// Optional fields in body: content
export function getContributions({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const { offset = 0 } = req.body as GetContributionsRequest;

      // TODO: validate request, maybe use autogenerated zod

      const contributions = await prisma.contribution.findMany({
        // where: {},
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: Limit,
      });
      res.json(contributions);
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).json({ error: "Received invalid data." });
        return;
      }
      res.status(400).json({ error: err.message });
    }
  };
}
