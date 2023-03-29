import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import VendorModel from '../models/Vendor.model';
import { IVendorRegisterInput, IVendorUpdateInput, IVendorLogin } from '../dto/Vendor.dto';
import { GenCode, GenSlug } from '../utility/VendorUtility';
import { sendConfirmationEmail, sendRestPasswordEmail } from '../utility/MailerUtility';
import bcrypt from 'bcrypt';
import { Buffer } from 'node:buffer';
import { signToken } from '../utility/JwtUtility';

/**
 * @description Vendor registration
 * @method POST
 * @route /api/vendors=
 * @access public
 */
export const RegisterVendor = async (
  req: Request<{}, {}, IVendorRegisterInput['body']>,
  res: Response
) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      businessName,
      phone,
      address,
    } = req.body;

    const existUser = await VendorModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const vendor = await VendorModel.create({
      firstName,
      lastName,
      password,
      phone,
      email,
      businessName,
      slug: GenSlug(businessName),
      address,
      confirmationCode: await GenCode(),
    });

    const name = `${vendor.firstName} ${vendor.lastName}`;
    const userType = 'vendors';
    const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Verify your email address to complete the signup and login to your account</p>
    <a href=${process.env.BASE_URL}/api/${userType}/confirm/${vendor?.confirmationCode}> Click here</a>`;
    const subject = 'Please confirm your account';

    let ress = await sendConfirmationEmail(
      name,
      vendor?.email,
      subject,
      message
    );

    if (ress !== null) {
      res.status(200).json({
        msg: 'User created successfully! Please check your mail',
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Something went wrong! Please try again' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * @description Verify Vendor account
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

/**
 * @description Update Vendor Profile
 * @method GET
 * @route /api/vendors/confirm/:confirmationCode
 * @access private/vendors
 */
export const UpdateVendorProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const vendor = await VendorModel.findById(req.user._id);
    const { firstName, lastName, businessName, image, phone, address } = <
      IVendorUpdateInput
    >req.body;

    if (vendor) {
      vendor.firstName = firstName || vendor.firstName;
      vendor.lastName = lastName || vendor.lastName;
      vendor.businessName = businessName || vendor.businessName;
      vendor.image = image || vendor.image;
      vendor.address = address || vendor.address;
      vendor.phone = phone || vendor.phone;

      if (businessName) {
        vendor.slug = GenSlug(businessName);
      }

      const updatedVendor = await vendor.save();

      res.status(200).send({
        msg: 'Profile updated successfully',
        updatedVendor,
      });
    } else {
      res.status(404);
      throw new Error('Vendor not found');
    }
  }
);

/**
 * @description Vendor Login
 * @method POST
 * @route /api/vendors/login
 * @access public
 */
export const vendorLogin = async (req: Request, res: Response) => {
    try{
      const { email, password } = <IVendorLogin> req.body;

      const vendor: any = await VendorModel.findOne({email: email});

      if(!vendor) {
        res.status(400).json({
          message: "Vendor Not Found"
        });
      }

      const verifyPass = await bcrypt.compare(password, vendor.password);

      if(!verifyPass) {
        res.status(400).json({
          message: "Invalid Credentials"
        });
      }
      if(vendor.status !== 'Active'){
        return res.status(400).json({
          message: "Please Activate Your Account By Confirming Your Email Address"
        })
      }
      
      res.status(200).json({
        _id: vendor.id,
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        businessName: vendor.businessName,
        email: vendor.email,
        address: vendor.address,
        slug: vendor.slug,
        role: vendor.role,
        image: vendor.image,
        phone: vendor.phone,
        token: await signToken({vendor: vendor._id, role: vendor.role})
      });

    }catch(error){
      res.status(400).json({
        message: "Error Logging In",
        Error: error
      })
    }
  };

