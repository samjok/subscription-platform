import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../database";
import "dotenv/config";
import {
  createErrorReponse,
  generateTokens,
  serverError,
  wrongCredentialsError,
} from "./utils";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;
  try {
    // Finding username from the database
    const userAccount = await db
      .selectFrom("users")
      .select(["username", "id", "password", "role"])
      .where("username", "=", username)
      .executeTakeFirst();

    if (userAccount) {
      // Comparing a given password with the crypted password from the database
      const isValid = await bcrypt.compare(password, userAccount.password);
      if (isValid) {
        const tokenData = {
          id: userAccount.id,
          username: userAccount.username,
          role: userAccount.role,
        };
        // refresh token can have much longer expiration time than access token, for example 30 days
        const refreshTokenExpirationTime = 3600 * 30;
        const { accessToken, refreshToken } = await generateTokens(
          tokenData,
          120, // access token expiration time can be quite short, for example 120 minutes
          refreshTokenExpirationTime
        );

        return res.status(200).json({
          success: true,
          data: {
            accessToken,
            refreshToken,
            user: {
              id: userAccount.id,
              username: userAccount.username,
              role: userAccount.role,
            },
          },
        });
      }
      const errorResponse = await createErrorReponse(wrongCredentialsError);
      return res.status(401).json(errorResponse);
    }
    const errorResponse = await createErrorReponse(wrongCredentialsError);
    return res.status(401).json(errorResponse);
  } catch (error) {
    const errorResponse = await createErrorReponse(serverError, error);
    return res.status(501).send(errorResponse);
  }
};
