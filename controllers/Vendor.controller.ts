import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import VendorModel from '../models/Vendor.model';
import {
  IVendorRegisterInput,
  IVendorUpdateInput,
  IVendorLogin,
} from '../dto/Vendor.dto';
import { GenCode, GenSlug } from '../utility/VendorUtility';
import { sendConfirmationEmail } from '../utility/MailerUtility';
import bcrypt from 'bcrypt';
import { signToken } from '../utility';

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
    let ress = await sendConfirmationEmail(
      name,
      vendor?.email,
      vendor?.confirmationCode,
      userType
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
    res.status(409).json({ errMsg: error.message });
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
 * @description Vendor Login
 * @method POST
 * @route /api/vendors/login
 * @access public
 */
export const VendorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = <IVendorLogin>req.body;

    const vendor = await VendorModel.findOne({ email });

    if (!vendor) {
      res.status(400);
      throw new Error('Vendor not found');
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      // res.status(400);
      // throw new Error('Invalid credentials');
      return res.status(400).json({message:'Invalid credentials'});
    }

    if (vendor.status !== 'Active') {
      return res
        .status(400)
        .json({message:'Please activate your account by confriming your email address'});
    }
  
    res.status(200).json({
      _id: vendor._id,
      firstName: vendor.firstName,
      lastName: vendor.lastName,git 
      businessName: vendor.businessName,
      email: vendor.email,
      address: vendor.address,
      slug: vendor.slug,
      role: vendor.role,
      image: vendor.image,
      phone: vendor.phone,
      token: await signToken({ id: vendor._id, role: vendor.role }),
    });
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
};

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

// export const vendorLogin = async (req: Request, res: Response) => {
//     try{
//       const { email, password } = <IVendorLogin> req.body;
//       if(email === "" || password === ""){
//         return res.status(400).json({
//           message: "Email And Password Is Required"
//         })
//       }
//       const vendor = await VendorModel.findOne({email: email});
//         if(vendor){
//         const verifyPass = await bcrypt.compare(password, vendor.password);
//         if(verifyPass){
//           const secret: any = process.env.JWT_SECRET;
//           const genToken = jwt.sign({vendor: vendor}, secret , {expiresIn: '1h'});
//           const fakePass: any = undefined
//           vendor.password = fakePass;

//           return res.status(200).json({
//             message: "User Found",
//             result: vendor,
//             token: genToken
//           });
//         }else{
//           return res.status(400).json({
//             message: "Incorrect Username Or Password"
//           });
//         }
//       }else{
//         return res.status(400).json({
//           message: "No Such User"
//         })
//       }
//     }catch(error){
//       res.status(400).json({
//         message: "Error Logging In",
//         Error: error
//       })
//     }
//   };
