import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { BuyerModel } from "../models";
import { IBuyerRegisterInput } from "../dto/Buyer.dto";
import { GenCode } from "../utility/VendorUtility";
import { sendConfirmationEmail } from "../utility/MailerUtility";

/**
 * @description Buyer registration
 * @method POST
 * @route /api/buyers=
 * @access public
 */

export const RegisterBuyer = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, email } = <IBuyerRegisterInput>(
      req.body
    );

    // check if buyer already exists in the database
    const existUser = await BuyerModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //if buyer does not exist create buyer
    const buyer = await BuyerModel.create({
      firstName,
      lastName,
      password,
      email,
      confirmationCode: await GenCode(),
    });

    //send confirmation code to buyer's email
    const name = `${buyer.firstName} ${buyer.lastName}`;
    const userType = 'buyers'
    let ress = await sendConfirmationEmail(
      name,
      buyer?.email,
      buyer?.confirmationCode,
      userType,
    );

    if (ress !== null) {
      res.status(200).json({
        msg: "User created successfully! Please check your mail",
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong! Please try again");
    }
  } catch (error: any) {
    res.status(400);
    throw new Error(error);
  }
};

export const verifyBuyer = asyncHandler(async (req: Request, res: Response) => {
  const { confirmationCode } = req.params;

  const confimBuyer = await BuyerModel.findOne({ confirmationCode });

  if (!confimBuyer) {
    res.status(404);
    throw new Error("Invalid Verification Code");
  }

  confimBuyer.status = "Active";
  confimBuyer.confirmationCode = "";

  await confimBuyer.save();

  res.status(200).json({
    msg: "Verification Successful.You can now login in",
  });
});
