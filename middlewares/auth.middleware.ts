import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { ValidateJwt } from "../utility";
import asyncHandler from "express-async-handler";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await ValidateJwt(req);

  if (validate) {
    next();
  } else {
    return res.status(400).json({
      message: "User not Authenticated",
    });
  }
};

export const AuthorizeBuyer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (req.user.role === "Buyer") {
    next();
  } else {
    return res.status(400).json({
      message: "User not Authorized",
    });
  }
};

export const AuthorizeVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === "Vendor") {
    next();
  } else {
    return res.status(400).json({
      message: "User not Authorized",
    });
  }
};
