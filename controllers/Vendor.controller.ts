import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import VendorModel from '../models/Vendor.model';
import { IVendorRegisterInput } from '../dto/Vendor.dto';
import { GenCode, GenSlug } from '../utility/VendorUtility';
import { sendConfirmationEmail } from '../utility/MailerUtility';

export const RegisterVendor = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      businessName,
      image,
      address,
    } = <IVendorRegisterInput>req.body;

    const existUser = await VendorModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const vendor = await VendorModel.create({
      firstName,
      lastName,
      password,
      email,
      businessName,
      slug: GenSlug(businessName),
      image,
      address,
      confirmationCode: await GenCode(),
    });

    const name = `${vendor.firstName} ${vendor.lastName}`;
    let ress = await sendConfirmationEmail(
      name,
      vendor?.email,
      vendor?.confirmationCode
    );

    if (ress !== null) {
      res.status(200).json({
        msg: 'User created successfully! Please check your mail',
      });
    } else {
      res.status(400);
      throw new Error('Something went wrong! Please try again');
    }
  } catch (error: any) {
    res.status(400);
    throw new Error(error);
  }
};

/**
 * @description Verify User
 * @method GET
 * @route /api/vendors/confirm/:confirmationCode
 * @access public
 */
export const verifyVendor = asyncHandler(
  async (req: Request, res: Response) => {
    const { confirmationCode } = req.params;

    const confimVendor = await VendorModel.findOne({ confirmationCode });

    if (!confimVendor) {
      res.status(404);
      throw new Error('Invalid Verification Code');
    }

    confimVendor.status = 'Active';
    confimVendor.confirmationCode = '';

    await confimVendor.save();

    res.status(200).json({
      msg: 'Verification Successful.You can now login in',
    });
  }
);
