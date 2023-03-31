import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { BuyerModel } from "../models";
import randomstring from "randomstring";
import * as bcrypt from "bcryptjs"
import { signToken } from "../utility";
import axios from "axios";
import { IBuyerUpdateInput } from "../dto/Buyer.dto";
import { IBuyerRegisterInput, IBuyerResetPassword } from "../dto/Buyer.dto";
import { GenCode } from "../utility/VendorUtility";
import { sendConfirmationEmail } from "../utility/MailerUtility";
import jwt from 'jsonwebtoken';

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
    const existUser = await BuyerModel.findOne({ email: email.toLowerCase() });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //if buyer does not exist create buyer
    const buyer = await BuyerModel.create({
      firstName,
      lastName,
      password,
      email: email.toLowerCase(),
      confirmationCode: await GenCode(),
    });

    //send confirmation code to buyer's email
    const name = `${buyer.firstName} ${buyer.lastName}`;
    const userType = "buyers";
    let ress = await sendConfirmationEmail(
      name,
      buyer?.email,
      buyer?.confirmationCode,
      userType
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

/**
 * @description Verify Buyer account
 * @method GET
 * @route /api/buyers/confirm/:confirmationCode
 * @access public
 */
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
    msg: "Verification Successful.You can now login",
  });
});


  /*
   *@description Login into Buyer account
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} token, details
   */

   export async function buyerLogin(req: Request, res: Response) {
     // retrieve the email and password from the request body
     const { email, password } = req.body;

  try {   
    if (!email || !password) {
      res.status(401).send({ message: "Kindly fill all required information" });
    }
    // find the email and check if they exist. 
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

    return res
      .status(200)
      .json({
        message: "User login successfully",
          id: user?._id,  
          firstname: user?.firstName,
          lastname: user?.lastName,
          gender: user?.gender,
          email: user?.email,
          token: await signToken(user.id)
      })
  }

  catch(error: any) {
    console.log(error)
    return res.status(500).json({
      message: "An Error Occured",
      error: error.error
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
 * @access private/buyers
 */
export const updateBuyerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const buyer = await BuyerModel.findById(req.user.id);
    
    const { firstName, lastName, phone, address } = <
      IBuyerUpdateInput
    >req.body;

    if (buyer) {
      buyer.firstName = firstName || buyer.firstName;
      buyer.lastName = lastName || buyer.lastName;
      // buyer.image = image || buyer.image;
      buyer.address = address || buyer.address;
      buyer.phone = phone || buyer.phone;

      const updatedBuyer = await buyer.save();

      res.status(200).send({
        msg: 'Profile updated successfully',
        updatedBuyer,
      });
    } else {
      res.status(404).send('Buyer not found')
    }
  }
);


/**
 * @description Buyer Forgot Password
 * @method POST
 * @route /api/buyers/forgotpassword
 * @access public
 */

export const forgotPassword = async(req: Request, res: Response) => {
  try{
    const { email } = req.body
    const checkEmail: any = await BuyerModel.findOne({ email })
    if(!checkEmail){
      return res.status(400).json({
        message: "No User With This Email"
      });
    }

    const secret = process.env.JWT_SECRET + checkEmail.password;
    const payload = {
      email: checkEmail.email,
      id: checkEmail.id
    }
    const name = `${checkEmail.firstName} ${checkEmail.lastName}`;
    const token = jwt.sign(payload, secret, {expiresIn: '5m'});
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
        reset_link: link
      });
    } else {
      return res.status(400).json({ 
        message: 'Something went wrong! Please try again' 
      });
    }
  }catch(error){
    console.log(error);
    res.status(400).json({
      message: "Error Sending Reset Password Email"
    })
  }
}


/**
 * @description Buyer Reset Password
 * @method POST
 * @route /api/buyers/restpassword
 * @access public
 */

export const resetPassword = async(req: Request, res: Response) => {
  try{
    const { id, token } = req.params;
    const { password, confirmPassword } = <IBuyerResetPassword> req.body;
    const user: any = await BuyerModel.findById(id).exec();
    if(user === null){
      return res.status(400).json({
        message: "No User With This Id"
      });
    }
    const secret = process.env.JWT_SECRET + user.password;
    const payload = jwt.verify(token, secret);
    if(confirmPassword !== password){
      return res.status(400).json({
        message: "Passwords Do Not Match"
      });
    }
    const newpassword = await bcrypt.hash(password, 10);
    console.log(newpassword)
    user.password = newpassword;
    await user.save();
    return res.status(200).json({
      message: "Password Reset Successfully!"
    })
  }catch(error){
    console.log(error);
    res.status(400).json({
      message: "Error Reseting Password"
    });
  }
}