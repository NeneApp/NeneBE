import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const ValidateJwt = async (req: Request) => {
  const signature = req.get('Authorization');

  if (signature) {
    const payload = await jwt.verify(
      signature.split(' ')[1],
      process.env.JWT_SECRET!
    );

    req.user = payload;

    return true;
  }

  return false;
};
