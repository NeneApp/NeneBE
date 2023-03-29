import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import VendorModel from '../models/Vendor.model';
import { IVendorRegisterInput, IVendorUpdateInput, IVendorLogin, IVendorResetPassword } from '../dto/Vendor.dto';
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
export const RegisterVendor = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      businessName,
      image,
      phone,
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
      phone,
      email,
      businessName,
      slug: GenSlug(businessName),
      image,
      address,
      confirmationCode: await GenCode(),
    });

    const name = `${vendor.firstName} ${vendor.lastName}`;
    const userType = 'vendors';
    let ress = await sendConfirmationEmail(
      name,
      vendor?.email,
      vendor?.confirmationCode,
      userType,
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

    const vendor: any = await VendorModel.findOne({ email });

    if(!vendor){
      res.status(400).json({
        message: "Vendor Not Found"
      });
    }

    const verifyPass = await bcrypt.compare(password, vendor.password);

    if(!verifyPass){
      res.status(400).json({
        message: "Invalid Credentials"
      });
    }
     
    if(vendor.status !== 'Active' && vendor.confirmationCode === ''){
      res.status(400).json({
        message: "Please Activate Your Account By Confirming Your Email Address"
      });
    }else{
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
        token: await signToken({id: vendor._id, role: vendor.role})//, vendor.role
      });
    }

  }catch(error){
    res.status(400).json({
      message: "Error Logging In",
      Error: error
    })
  }
};

/**
 * @description Vendor Forgot Password
 * @method POST
 * @route /api/vendors/forgotpassword
 * @access public
 */

export const forgotPassword = async (req: Request, res: Response) => {
  try{
    const email = req.body.email
    const Vendor: any = await VendorModel.findOne({email});
    const name = `${Vendor.firstName} ${Vendor.lastName}`
    if(Vendor){
      let sendMail = await sendRestPasswordEmail(
        name, 
        Vendor.email
      );
      if(sendMail !== null){
        return res.status(200).json({
            message: "Reset Password Mail Sent Successfully"
        });
      }else{
        return res.status(400).json({
            message: "Something Went Wrong. Please, Try Again."
        });
      }
    }else{
        return res.status(400).json({
            message: "Email Does Not Exist."
        });
    }
  }catch(error){
    console.log(error)
    return res.status(400).json({
      message: "Error Sending Mail"
    });
  }
};

/**
 * @description Vendor Reset Password
 * @method POST
 * @route /api/vendors/resetpassword
 * @access public
 */

export const resetPassword = async (req: Request, res: Response) => {
  try{
    const { email } = req.params;
    const { password, confirmPassword } = <IVendorResetPassword> req.body;
    const decodeEmail = Buffer.from(email, "base64").toString("utf-8");
    const checkEmail : any = await VendorModel.findOne({ decodeEmail });
    if(password !== confirmPassword){
      res.status(400).json({
        message: "Passwords Do Not Match"
      });
    }else{
      const newPass = bcrypt.hash(password, 12)
      checkEmail.password = newPass;
      const updatedPass = checkEmail.save();
      res.status(200).json({
        message: "Password Reset Successful",
        user: checkEmail
      });
    }
  }catch(error){
    res.status(400).json({
      message: "Error Resting Password"
    })
  }
}