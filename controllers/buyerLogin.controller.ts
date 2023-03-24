import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { BuyerModel } from "../models";
import { validationResult } from 'express-validator';
import randomstring from "randomstring";
import * as bcrypt from "bcryptjs"
import { signToken } from "../utility";
import axios from "axios";
import { IBuyerUpdateInput } from "../dto/Buyer.dto";

  /*
   *@description Login into Buyer account
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} token, details
   */

export async function buyerLogin(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

  try {
    // retrieve the email and password from the request body
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send({ message: "Kindly fill all required information" });
    }
    // find the email or username and check if they exist. 
    const user = await BuyerModel.findOne({ email }).select("+password").exec();
  
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unable to login, Invalid email or  password" });
    }

    // Check if the user's email is set to active.
    if (user.status !== "Active") {
      return res.status(400).json({ message: "your email is yet to be verified" })
    }
    
    // compare the password
    const correctPassword = await bcrypt.compare(password, user.password as string);
    if (!correctPassword) {
      return res
        .status(401)
        .json({ message: "Unable to login, Invalid email or  password"})
    }

    const TokenData = {
      id: user?._id,
      email: user?.email,
      firstname: user?.firstName,
      lastname: user?.lastName,
    };

    const responseObject: Object = {
      firstname: user?.firstName,
      lastname: user?.lastName,
      gender: user?.gender,
      email: user?.email,
      _id: user?._id
    };


    // generate tokens
    const token = await signToken(TokenData);

    const userData = {
      responseObject,
      token
    }

    return res
      .status(200)
      .json({
        message: "User login successfully",
        userData
      })
  }

  catch(error: any) {
    return res.status(500).json({
      message: "An Error Occured",
      error: error
    });
  }
}


/**
   *@description Register into user account with google
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and data
   *@memberof userController
*/

export async function googleAuth(req: Request, res: Response) {
  const { token } = req.body;
  let user;

  try {
    const google = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    user = await BuyerModel.findOne({ email: google.data.email });

    if (user) {
      const TokenData = {
        id: user._id,
        email: user.email,
      };

      //  Generate Token
      const token = await signToken(TokenData);

      const userData = {
        user,
        token,
      };

      res.status(200).send({ message: "Login successfully", userData });
    } else {
      const code = randomstring.generate({
        length: 15,
        charset: "numeric",
      });

      const userObject = {
        email: google.data.email != null ? google.data.email : "",
        full_name: google.data.name != null ? google.data.name : "",
        phone: google.data.phone != null ? google.data.phone : "",
        avartar: google.data.picture != null ? google.data.picture : "",
        status: 'Active',
        password: code,
      };

      user = await BuyerModel.create(userObject);
      const TokenData = {
        id: user._id,
        email: user.email,
      };

      //  Generate Token
      const token = await signToken(TokenData);

      const userData = {
        user,
        token,
      };

      if (user) {
        res
          .status(201)
          .send({ message: "Account created, kindly proceed", userData });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error", error });
  }
}


/**
 * @description Update Buyer Profile
 * @method GET
 * @route /api/buyers/confirm/:confirmationCode
 * @access private/vendors
 */
export const updateBuyerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const buyer = await BuyerModel.findById(req.user._id);
    const { firstName, lastName, phone, image, address } = <
      IBuyerUpdateInput
    >req.body;

    if (buyer) {
      buyer.firstName = firstName || buyer.firstName;
      buyer.lastName = lastName || buyer.lastName;
      buyer.image = image || buyer.image;
      buyer.address = address || buyer.address;
      buyer.phone = phone || buyer.phone;

      const updatedBuyer = await buyer.save();

      res.status(200).send({
        msg: 'Profile updated successfully',
        updatedBuyer,
      });
    } else {
      res.status(404);
      throw new Error('Buyer not found');
    }
  }
);
