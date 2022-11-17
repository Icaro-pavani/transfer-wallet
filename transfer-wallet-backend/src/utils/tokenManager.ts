import jwt from "jsonwebtoken";
import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";

const secretKey = process.env.JWT_KEY;

export type JWTPayload = { id: string };

function generateToken(id: number) {
  const data = { id };
  const config = { expiresIn: 60 };
  return jwt.sign(data, secretKey, config);
}

async function validateToken(token: string) {
  try {
    const data = jwt.verify(token, secretKey) as JWTPayload;
    return data;
  } catch (error) {
    throw unauthorizedError("Invalid or expired Token!");
  }
}

const tokenManager = { generateToken, validateToken };

export default tokenManager;
