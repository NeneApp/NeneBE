import { Request, Response } from "express";
import { BuyerModel, IBuyerLogin } from "../models";
import jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

export async function login(req: Request, res: Response) {

  try {
    // retrieve the username, email and password from the request body
    const {username, email, password }: { username: string; email: string; password: string } = req.body;
    
    // find the email or username and check if they exist. 
    const buyerUsername = await BuyerModel.findOne({username})
    const buyer = await BuyerModel.findOne({ email }).select("+password").exec();
  
    if (!buyer || !buyerUsername) {
      return res
        .status(401)
        .json({ message: "This User does not exist." });
    }

    // compare the password
    const correctPassword = await bcrypt.compare(password, buyer.password as string);
    if (!correctPassword) {
      return res
        .status(401)
        .json({ message: "Invalid email or password"})
    }

   const token = jwt.sign(
        { user_id: buyer._id, email: buyer.email },
            (process.env.JWT_SECRET as string),
        {
          expiresIn: "2h",
        }
    );
      // save user token
    buyer.token = token;
    return res
      .status(200)
      .json({
        message: "User login successfully",
        data: buyer 
      })
  }
  catch(error: any) {
    return res.status(500).json({
      message: "An Error Occured",
      error: error
    });
  }
}

// Google Authenticatication
