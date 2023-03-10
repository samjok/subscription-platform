import jwt from "jsonwebtoken";
import "dotenv/config";
import { Message } from "../../types";

export async function generateTokens(
  data: string,
  accessTokenExpirationTimeInMinutes: number,
  refreshTokenExpirationTimeInMinutes: number
) {
  const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET);
  const refreshTokenSecret = String(process.env.REFRESH_TOKEN_SECRET);

  const accessToken = jwt.sign(data, accessTokenSecret, {
    expiresIn: 60 * accessTokenExpirationTimeInMinutes,
  });

  const refreshToken = jwt.sign(data, refreshTokenSecret, {
    expiresIn: 60 * refreshTokenExpirationTimeInMinutes,
  });

  return { accessToken, refreshToken };
}

export async function createErrorReponse(
  errorMessage: string,
  error: any | undefined = undefined
): Promise<Message> {
  if (error) {
    return {
      success: false,
      msg: errorMessage,
      error,
    };
  }
  return {
    success: false,
    msg: errorMessage,
  };
}
