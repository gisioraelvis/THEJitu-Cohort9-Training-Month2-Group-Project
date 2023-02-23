import Bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  UserForgotPasswordDto,
  UserPasswordResetDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdateProfileByAdminDto,
  UserUpdateProfileDto,
} from "../dtos/user.dto";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { generateJWT } from "../utils/generate-jwt.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import dotenv from "dotenv";
import { sendEmail } from "../utils/email.util";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

/**
 * @desc    Auth user & generate JWT token
 * @route   POST /api/users/signin
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { error } = UserSignInDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { email, password } = req.body;

  try {
    const user = await dbUtils.exec("usp_FindUserByEmail", { email });

    if (user.recordset.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await Bcrypt.compare(password, user.recordset[0].password);

    if (isMatch) {
      const { id, name, email, isAdmin } = user.recordset[0];

      const JWT = generateJWT(
        {
          id,
          name,
          email,
          isAdmin,
        } as IJWTPayload,
        "1d"
      );

      return res.status(200).json({ id, name, email, isAdmin, JWT });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/signup
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { error } = UserSignUpDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { name, email, password } = req.body;

  try {
    const user = await dbUtils.exec("usp_FindUserByEmail", { email });

    if (user.recordset.length > 0) {
      return res.status(400).json({
        message:
          "User with similar email already exists, please try another email",
      });
    }

    const passwordHash = await Bcrypt.hash(password, 10);

    const newUser = await dbUtils.exec("usp_RegisterUser", {
      name,
      email,
      password: passwordHash,
    });

    if (newUser.recordset.length > 0) {
      const { id, name, email, isAdmin } = newUser.recordset[0];

      // Send email to welcome new user to the system(GadgetHub)
      const subject = "Welcome to GadgetHub";
      const html = `<h1>Welcome to GadgetHub</h1>
      <p>Dear ${name},</p>
      <p>Thank you for registering an account with GadgetHub.</p>
      <P>We are happy to have you on board and ready to serve you.</P>
      <P>Happy <a href=${process.env.CLIENT_URL}>Shopping</a> 🎉</P>
      <p>Regards,<br/>GadgetHub Team</p>`;

      sendEmail(subject, email, html);

      const JWT = generateJWT(
        {
          id,
          name,
          email,
          isAdmin,
        } as IJWTPayload,
        "1d"
      );

      return res.status(201).json({ id, name, email, isAdmin, JWT });
    } else {
      return res.status(400).json({ message: "User registration failed" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/users/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req: Request, res: Response) => {
  const { error } = UserForgotPasswordDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const userEmail = req.body.email;

  try {
    const user = await dbUtils.exec("usp_FindUserByEmail", {
      email: userEmail,
    });

    if (user.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "User with provided email does not exist" });
    }

    const { id, name, email, isAdmin } = user.recordset[0];

    const JWT = generateJWT({ id, name, email, isAdmin } as IJWTPayload, "1h");

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/?resetToken=${JWT}`;

    const passwordResetMsg = `
      <h1>You requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>If you did not request this, please ignore this email</p>
    `;

    try {
      await sendEmail("Password Reset Request", email, passwordResetMsg);

      return res.status(200).json({
        message: "We have sent a link to reset your password to your email",
        resetUrl,
      });
    } catch (error: any) {
      CreateLog.error(error);
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/users/reset-password
 * @access  Public
 */
export const resetPassword = async (req: IRequestWithUser, res: Response) => {
  const { error } = UserPasswordResetDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const password = req.body.password as string;

  try {
    const { id, name, email, isAdmin } = req.user as IUser;

    const passwordHash = await Bcrypt.hash(password, 10);

    const updatedUser = await dbUtils.exec("usp_UpdateUser", {
      id,
      name,
      email,
      password: passwordHash,
      isAdmin,
    });

    if (updatedUser.recordset.length > 0) {
      const { id, name, email, isAdmin } = updatedUser.recordset[0];

      //password reset was successful email
      const subject = "Password Reset Successful";
      const html = `<h1>Password Reset Successful</h1>
      <p>Dear ${name},</p>
      <p>Your password has been reset successfully.</p>
      <P>Happy <a href=${process.env.CLIENT_URL}>Shopping</a> 🎉</P>
      <p>If you did not request this, please contact us immediately.</p>
      <p>Regards,<br/>GadgetHub Team</p>`;

      sendEmail(subject, email, html);

      const JWT = generateJWT(
        {
          id,
          name,
          email,
          isAdmin,
        } as IJWTPayload,
        "1d"
      );

      return res.status(200).json({ id, name, email, isAdmin, JWT });
    } else {
      return res.status(400).json({
        message: "Password reset failed, please request a new password reset",
      });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req: IRequestWithUser, res: Response) => {
  const userId = req.user?.id as string;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const { id, name, email, isAdmin } = user.recordset[0];

      return res.status(200).json({ id, name, email, isAdmin });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = UserUpdateProfileDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const userId = req.user?.id as string;
  const { name, email, password } = req.body;

  try {
    // If user tries to update email that already exists in the database
    // i.e another user exists with the same email that's not the current user
    const otherUser = await dbUtils.exec("usp_FindUserByEmail", { email });

    // check if otherUser is not the current user
    if (otherUser.recordset.length > 0) {
      if (otherUser.recordset[0].id !== userId) {
        return res.status(400).json({
          message:
            "Another user with a similar email already exists, please try another email",
        });
      }
    }

    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const passwordHash = await Bcrypt.hash(password, 10);

      const updatedUser = await dbUtils.exec("usp_UpdateUser", {
        id: userId,
        name,
        email,
        password: passwordHash,
      });

      if (updatedUser.recordset.length > 0) {
        const { id, name, email, isAdmin } = updatedUser.recordset[0];

        return res.status(200).json({ id, name, email, isAdmin });
      } else {
        return res.status(400).json({ message: "User profile update failed" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private - Admin only
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await dbUtils.exec("usp_GetAllUsers");

    // returns the users else if ther's none yet an empty array is returned
    return res.status(200).json(users.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private - Admin only
 */
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const { id, name, email, isAdmin } = user.recordset[0];

      return res.status(200).json({ id, name, email, isAdmin });
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private - Admin only
 */
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const deletedUser = await dbUtils.exec("usp_DeleteUser", { id: userId });

      if (deletedUser.rowsAffected[0] > 0) {
        return res.status(200).json({ message: "User deleted" });
      } else {
        return res.status(400).json({ message: "User delete failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Upgrade user to an admin
 * @route   PATCH /api/users/:id
 * @access  Private - Admin only
 */
export const upgradeUserToAdmin = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const upgradedUser = await dbUtils.exec("usp_UpgradeUserToAdmin", {
        id: userId,
      });

      if (upgradedUser.rowsAffected[0] > 0) {
        return res.status(200).json({ message: "User upgraded to admin" });
      } else {
        return res.status(400).json({ message: "User upgrade failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update user profile by admin
 * i.e all fields including upgrading to admin except password
 * @route   PUT /api/users/:id
 * @access  Private - Admin only
 */
export const updateUserProfileByAdmin = async (
  req: IRequestWithUser,
  res: Response
) => {
  const userId = req.params.id as string;

  const { error } = UserUpdateProfileByAdminDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { name, email, isAdmin } = req.body;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      // check if the email is already taken by another user that's not the current user
      const emailExists = await dbUtils.exec("usp_FindUserByEmail", { email });
      if (
        emailExists.recordset.length > 0 &&
        emailExists.recordset[0].id !== +userId
      ) {
        return res.status(400).json({ message: "Email already taken" });
      }

      // email field is unique, so if user doesn't change the email/mantains same email,
      // the update it will throw an error(Violation of UNIQUE KEY constraint)
      // So we need to check if the email is the same as the one in the db before updating
      // if same email exclude it from the update else update everything
      if (email === user.recordset[0].email) {
        const updatedUser = await dbUtils.exec("usp_UpdateUserProfileByAdmin", {
          id: userId,
          name,
          isAdmin,
        });

        if (updatedUser.rowsAffected[0] > 0) {
          return res.status(200).json({
            message: "User profile updated",
            updatedUser: updatedUser.recordset[0],
          });
        } else {
          return res
            .status(400)
            .json({ message: "User profile update failed" });
        }
      } else {
        const updatedUser = await dbUtils.exec("usp_UpdateUserProfileByAdmin", {
          id: userId,
          name,
          email,
          isAdmin,
        });

        if (updatedUser.rowsAffected[0] > 0) {
          return res.status(200).json({
            message: "User profile updated",
            updatedUser: updatedUser.recordset[0],
          });
        } else {
          return res
            .status(400)
            .json({ message: "User profile update failed" });
        }
      }
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
