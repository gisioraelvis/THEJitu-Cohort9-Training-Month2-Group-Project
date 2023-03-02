import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const jwtSecret = process.env.JWT_SECRET as string;

// Generate JWT token
export const generateJWT = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn,
  });
};
