import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import VendorModel from '../models/Vendor.model';
import ProductModel from '../models/Product.model';
import CategoryModel from '../models/Category.model';
import {
  IVendorRegisterInput,
  IVendorUpdateInput,
  IVendorLogin,
  IVendorResendConfirm,
  IVendorResetPassword,
  IVendorCreateProduct,
  IVendorCategory,
  IVendorAddSub
} from '../dto/Vendor.dto';

import { GenCode, GenSlug } from '../utility/VendorUtility';
import { sendConfirmationEmail } from '../utility/MailerUtility';
import bcrypt from 'bcryptjs';
import { signToken } from '../utility/JwtUtility';
import axios from 'axios';
import randomstring from 'randomstring';

import jwt from 'jsonwebtoken';
import config from '../config/environment';
import log from '../utility/logger';

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
    <a href=${config.BASE_URL}/api/${userType}/confirm/${vendor?.confirmationCode}> Click here</a>`;
    const subject = 'Please confirm your account';

    let ress = await sendConfirmationEmail(
      name,
      vendor?.email,
      subject,
      message
    );

    if (ress !== null) {
      res.status(201).json({
        msg: 'User created successfully! Please check your mail',
      });
    } else {
      return res
        .status(500)
        .json({ message: 'Something went wrong! Please try again' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
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
      msg: 'Verification Successful.You can now login',
    });
  }
);

/**
 * @description Resend verification link to Vendor's email
 * @method POST
 * @route /api/vendors/resend-confirm
 * @access public
 */
export const resendVendorVerificionLink = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email } = <IVendorResendConfirm>req.body;

      const vendor = await VendorModel.findOne({ email: email.toLowerCase() });
      if (!vendor) {
        res.status(400).send({ msg: 'User does not exist' });
        return;
      }

      //send confirmation code to buyer's email
      const name = `${vendor.firstName} ${vendor.lastName}`;
      const userType = 'vendors';
      const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Verify your email address to complete the signup and login to your account</p>
    <a href=${config.BASE_URL}/api/${userType}/confirm/${vendor?.confirmationCode}> Click here</a>`;
      const subject = 'Please confirm your account';
      let ress = await sendConfirmationEmail(
        name,
        vendor?.email,
        subject,
        message
      );

      if (ress !== null) {
        res.status(200).json({
          msg: 'Verification link sent, kindly check your mail',
        });
      } else {
        res.status(400);
        throw new Error('Something went wrong! Please try again');
      }
    } catch (error: any) {
      log.error(error);
      res
        .status(500)
        .send({ msg: 'Something went wrong! Please try again', error });
    }
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
      res.status(404).send('Vendor not found');
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
  try {
    const { email, password } = <IVendorLogin>req.body;

    const vendor: any = await VendorModel.findOne({ email: email });

    if (!vendor) {
      res.status(404).json({
        message: 'Vendor Not Found',
      });
    }

    const verifyPass = await bcrypt.compare(password, vendor.password);

    if (!verifyPass) {
      res.status(401).json({
        message: 'Invalid Credentials',
      });
    }
    if (vendor.status !== 'Active') {
      return res.status(400).json({
        message:
          'Please Activate Your Account By Confirming Your Email Address',
      });
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
      token: await signToken({ vendor: vendor._id, role: vendor.role }),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error Logging In',
      Error: error,
    });
  }
};

/**
 * @description Vendor Google Login
 * @method POST
 * @route /api/vendors/google
 * @access public
 */

export async function googleAuth(req: Request, res: Response) {
  const { token } = req.body;
  let user;

  try {
    const google = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    user = await VendorModel.findOne({ email: google.data.email });

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

      res.status(200).json({ message: 'Login successfully', userData });
    } else {
      const code = randomstring.generate({
        length: 15,
        charset: 'numeric',
      });

      const userObject = {
        email: google.data.email != null ? google.data.email : '',
        full_name: google.data.name != null ? google.data.name : '',
        phone: google.data.phone != null ? google.data.phone : '',
        avartar: google.data.picture != null ? google.data.picture : '',
        status: 'Active',
        password: code,
      };

      user = await VendorModel.create(userObject);
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
        res.status(201).json({
          message: 'Account created, kindly proceed',
          userData,
        });
      }
    }
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: 'Error', error });
  }
}

/**
 * @description Vendor Forgot Password
 * @method POST
 * @route /api/vendors/forgotpassword
 * @access public
 */

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const checkEmail: any = await VendorModel.findOne({ email });
    if (!checkEmail) {
      return res.status(400).json({
        message: 'No User With This Email',
      });
    }

    const secret = process.env.JWT_SECRET + checkEmail.password;
    const payload = {
      email: checkEmail.email,
      id: checkEmail.id,
    };
    const name = `${checkEmail.firstName} ${checkEmail.lastName}`;
    const token = jwt.sign(payload, secret, { expiresIn: '5m' });
    const link = `${process.env.BASE_URL}/reset-password/${checkEmail.id}/${token}`;
    const message = `<h1>Reset Password</h1>
    <h2>Hello ${name}</h2>
    <p>Please Reset Your Password</p>
    <a href=${process.env.BASE_URL}/reset-password/${checkEmail.id}/${token}> Click here</a>`;
    const subject = 'Please Reset Your Password';

    let ress = await sendConfirmationEmail(
      name,
      checkEmail.email,
      subject,
      message
    );
    if (ress !== null) {
      return res.status(200).json({
        message: 'Rest Password Link Sent successfully! Please check your mail',
        reset_link: link,
      });
    } else {
      return res.status(400).json({
        message: 'Something went wrong! Please try again',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error Sending Reset Password Email',
    });
  }
};

/**
 * @description Vendor Reset Password
 * @method POST
 * @route /api/vendors/restpassword
 * @access public
 */

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;
    const { password, confirmPassword } = <IVendorResetPassword>req.body;
    const user: any = await VendorModel.findById(id).exec();
    if (user === null) {
      return res.status(400).json({
        message: 'No User With This Id',
      });
    }
    const secret = process.env.JWT_SECRET + user.password;
    const payload = jwt.verify(token, secret);
    if (confirmPassword !== password) {
      return res.status(400).json({
        message: 'Passwords Do Not Match',
      });
    }
    const newpassword = await bcrypt.hash(password, 10);
    console.log(newpassword);
    user.password = newpassword;
    await user.save();
    return res.status(200).json({
      message: 'Password Reset Successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error Reseting Password',
    });
  }
}

/**
 * @description Vendor Add Category
 * @method POST
 * @route /api/vendors/add_category
 * @access public
 */

export const addCategory = async(req: Request, res: Response) => {
  try{
    const { name } = <IVendorCategory>req.body;
    const category: any = await CategoryModel.findOne({ name });
    if(category){
      return res.status(400).json({
        message: "This Category Exists Already"
      })
    }
    const newCategory = await CategoryModel.create({
      name
    });
    return res.status(200).json({
      message: "Category Added Successfully",
      result: newCategory
    })
  }catch(error){
    log.error(error)
    res.status(400).json({
      message: "Error Adding Category"
    })
  }
}

/**
 * @description Vendor Create Product
 * @method POST
 * @route /api/vendors/{categoryId}/add_sub_category
 * @access public
 */
export const addSubCategory = async(req: Request, res: Response) => {
  try{
    const { categoryId } = req.params;
    const { name } = <IVendorAddSub>req.body;
    const category: any = await CategoryModel.findById( categoryId ).exec();
    if(!category){
      return res.status(400).json({
        message: "No Category with Such Id"
      });
    }
    if(category.subCategory.includes(name)){
      return res.status(400).json({
        message: "This Sub Category Exists Already"
      });
    }
    category.subCategory.push(name)
    const savedCategory = await category.save()
    return res.status(200).json({
      message: "Sub Category Added Successfully",
      result: savedCategory
    })
  }catch(error){
    log.error(error)
    res.status(400).json({
      message: "Error Adding Sub Category"
    });
  }
}

/**
 * @description Vendor Create Product
 * @method POST
 * @route /api/vendors/create_product
 * @access public
 */

export const CreateProduct = async(req: Request, res: Response) => {
  try{
    const {
            name,
            brand,
            quantity,
            description,
            prize,
            discount,
            attribute,
            category
          } = <IVendorCreateProduct>req.body;
          const categoryInfo: any = await CategoryModel.findOne({name: category});
      
          if(!categoryInfo){
            return res.status(400).json({
              message: "No Such Category"
            });
          }
          const checkProd: any = await ProductModel.findOne({ name });
          if(checkProd && checkProd.quantity > 0 && checkProd.is_sold === false){
            return res.status(400).json({
              message: "This Product Exists And Is Yet To Be Sold Out"
            });
          }
          const product = await ProductModel.create({
            name,
            store_id: await GenCode(),
            brand,
            quantity,
            description,
            code: await GenCode(),
            slug: GenSlug(name),
            prize,
            discount,
            attribute,
            is_sold: false,
            category: categoryInfo.id
          });
          return res.status(200).json({
            message: "Product created Successfully",
            result: product
          })
  }catch(error){
    log.error(error)
    res.status(400).json({
      message: "Error Creating product"
    })
  }
};