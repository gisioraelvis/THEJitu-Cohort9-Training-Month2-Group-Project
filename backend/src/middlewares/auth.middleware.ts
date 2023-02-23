import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import dotenv from "dotenv";
import { CreateLog } from "../utils/logger.util";
dotenv.config({ path: __dirname + "../../.env" });

const dbUtils = new DatabaseUtils();

/**
 * @description - Middleware to protect routes that require authentication
 * Validates JWT token and checks if user exist and is logged in
 */
export const authenticateUser = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET as string;

      // Verify token
      const decoded = jwt.verify(token, jwtSecret) as IJWTPayload;

      // Check if user still exists
      const user = (await dbUtils.exec("usp_FindUserById", { id: decoded.id }))
        .recordset[0] as IUser;
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized, user no longer exists" });
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, JWT failed" });
      CreateLog.error(error);
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no JWT }" });
  }
};

// Check if user is admin - protects admin routes
export const authorizeAdmin = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
): any => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden, not authorized to perform action" });
  }
};

// Check if token is valid and not expired
export const verifyPasswordResetToken = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    const token = req.query.resetToken as string;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Password reset failed, no token found" });
    }

    const decoded = jwt.verify(token, jwtSecret) as IJWTPayload;
    const user = (await dbUtils.exec("usp_FindUserById", { id: decoded.id }))
      .recordset[0] as IUser;
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token, user no longer exists" });
    }

    // Check if token has expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return res.status(400).json({
        message: "Link has expired, please request a new password reset",
      });
    }

    req.user = user;

    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    CreateLog.error(error);
  }
};
