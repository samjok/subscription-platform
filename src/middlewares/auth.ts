import { Request, Response, NextFunction } from "express";
import { db } from "../database";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createErrorReponse, unauthorizedError } from "../controllers/utils";

type Token = {
  data: string;
  iat: number;
  exp: number;
};

const secret = String(process.env.ACCESS_TOKEN_SECRET);

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errorResponse = await createErrorReponse(unauthorizedError);
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedData = jwt.verify(token.split(" ")[1], secret);
      const id = Number((decodedData as Token).data);

      const existingUserAccount = await db
        .selectFrom("users")
        .select(["username", "id", "role"])
        .where("id", "=", id)
        .executeTakeFirst();

      if (existingUserAccount) {
        req.body.user = {
          username: existingUserAccount.username,
          id: existingUserAccount.id,
          role: existingUserAccount.role,
        };
        next();
      } else res.status(401).json(errorResponse);
    } else res.status(401).json(errorResponse);
  } catch (error) {
    res.status(401).json(errorResponse);
  }
};

export default auth;
