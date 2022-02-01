// GET /stats

import { GetStatsResponse } from "@common/server-api";
import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { Services } from "../types";

export function getStats({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const authorsTotal = await prisma.user.count();
      const contributionsTotal = await prisma.contribution.count();

      res.json({ authorsTotal, contributionsTotal } as GetStatsResponse);
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientValidationError) {
        res
          .status(400)
          .json({ error: `Received invalid data. ${err.message}` });
        return;
      }
      res.status(400).json({ error: err.message });
    }
  };
}
