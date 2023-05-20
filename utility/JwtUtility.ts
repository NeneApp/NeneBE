import { Request } from "express";
import jwt from "jsonwebtoken";

export const ValidateJwt = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = await jwt.verify(
      signature.split(" ")[1],
      process.env.JWT_SECRET!
    );
    req.user = payload;

    return true;
  }

  return false;
};

const genToken = async (data: any) => {
  let token;
  // generate new jwt token for registeration
  token = jwt.sign(
    {
      ...data,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const signToken = async (data: any) => {
  const token = await genToken({
    ...data,
  });

  return token;
};
