// GET /users/:id

import { Author, GetUserRequest } from "@common/server-api";
import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { Services } from "../types";

export function getUser({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const params = req.params as unknown as GetUserRequest;
      const id = params.id;

      // TODO: validate request, maybe use autogenerated zod

      const author = await prisma.user.findFirst({
        where: { id },
      });

      res.json(
        author ? ({ ...author, walletId: author.id } as Author) : undefined
      );
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
