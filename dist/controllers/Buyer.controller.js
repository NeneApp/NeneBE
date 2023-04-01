"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.updateBuyerProfile = exports.googleAuth = exports.buyerLogin = exports.resendBuyerVerificionLink = exports.verifyBuyer = exports.RegisterBuyer = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
const randomstring_1 = __importDefault(require("randomstring"));
const bcrypt = __importStar(require("bcryptjs"));
const utility_1 = require("../utility");
const axios_1 = __importDefault(require("axios"));
const VendorUtility_1 = require("../utility/VendorUtility");
const MailerUtility_1 = require("../utility/MailerUtility");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @description Buyer registration
 * @method POST
 * @route /api/buyers=
 * @access public
 */
const RegisterBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, email } = req.body;
        // check if buyer already exists in the database
        const existUser = yield models_1.BuyerModel.findOne({ email: email.toLowerCase() });
        if (existUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        //if buyer does not exist create buyer
        const buyer = yield models_1.BuyerModel.create({
            firstName,
            lastName,
            password,
            email: email.toLowerCase(),
            confirmationCode: yield (0, VendorUtility_1.GenCode)(),
        });
        //send confirmation code to buyer's email
        const name = `${buyer.firstName} ${buyer.lastName}`;
        const userType = "buyers";
        const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Verify your email address to complete the signup and login to your account</p>
    <a href=${process.env.BASE_URL}/api/${userType}/confirm/${buyer === null || buyer === void 0 ? void 0 : buyer.confirmationCode}> Click here</a>`;
        const subject = 'Please confirm your account';
        let ress = yield (0, MailerUtility_1.sendConfirmationEmail)(name, buyer === null || buyer === void 0 ? void 0 : buyer.email, subject, message);
        if (ress !== null) {
            res.status(200).json({
                msg: "User created successfully! Please check your mail",
            });
        }
        else {
            res.status(400);
            throw new Error("Something went wrong! Please try again");
        }
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});
exports.RegisterBuyer = RegisterBuyer;
/**
 * @description Verify Buyer account
 * @method GET
 * @route /api/buyers/confirm/:confirmationCode
 * @access public
 */
exports.verifyBuyer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmationCode } = req.params;
    const confimBuyer = yield models_1.BuyerModel.findOne({ confirmationCode });
    if (!confimBuyer) {
        res.status(404);
        throw new Error("Invalid Verification Code");
    }
    confimBuyer.status = "Active";
    confimBuyer.confirmationCode = "";
    yield confimBuyer.save();
    res.status(200).json({
        msg: "Verification Successful.You can now login",
    });
}));
/**
 * @description Resend verification link to Buyer's email
 * @method POST
 * @route /api/buyers/resend-confirm
 * @access public
 */
exports.resendBuyerVerificionLink = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const buyer = yield models_1.BuyerModel.findOne({ email: email.toLowerCase() });
        if (!buyer) {
            res.status(400);
            throw new Error("user does not exist");
        }
        //send confirmation code to buyer's email
        const name = `${buyer.firstName} ${buyer.lastName}`;
        const userType = "buyers";
        const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Verify your email address to complete the signup and login to your account</p>
    <a href=${process.env.BASE_URL}/api/${userType}/confirm/${buyer === null || buyer === void 0 ? void 0 : buyer.confirmationCode}> Click here</a>`;
        const subject = 'Please confirm your account';
        let ress = yield (0, MailerUtility_1.sendConfirmationEmail)(name, buyer === null || buyer === void 0 ? void 0 : buyer.email, subject, message);
        if (ress !== null) {
            res.status(200).json({
                msg: "Verification link sent, kindly check your mail",
            });
        }
        else {
            res.status(400);
            throw new Error("Something went wrong! Please try again");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error", error });
    }
}));
/*
 *@description Login into Buyer account
 *@static
 *@param  {Object} req - request
 *@param  {object} res - response
 *@returns {object} token, details
 */
function buyerLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // retrieve the email and password from the request body
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                res.status(401).send({ message: "Kindly fill all required information" });
            }
            // find the email and check if they exist. 
            const user = yield models_1.BuyerModel.findOne({ email }).select("+password").exec();
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Unable to login, Invalid email or  password" });
            }
            // Check if the user's email is set to active.
            if (user.status !== "Active") {
                return res.status(400).json({ message: "your email is yet to be verified" });
            }
            // compare the password
            const correctPassword = yield bcrypt.compare(password, user.password);
            if (!correctPassword) {
                return res
                    .status(401)
                    .json({ message: "Unable to login, Invalid email or  password" });
            }
            return res
                .status(200)
                .json({
                message: "User login successfully",
                id: user === null || user === void 0 ? void 0 : user._id,
                firstname: user === null || user === void 0 ? void 0 : user.firstName,
                lastname: user === null || user === void 0 ? void 0 : user.lastName,
                gender: user === null || user === void 0 ? void 0 : user.gender,
                email: user === null || user === void 0 ? void 0 : user.email,
                token: yield (0, utility_1.signToken)(user.id)
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "An Error Occured",
                error: error.error
            });
        }
    });
}
exports.buyerLogin = buyerLogin;
/**
   *@description Register into user account with google
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and data
   *@memberof userController
*/
function googleAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        let user;
        try {
            const google = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
            user = yield models_1.BuyerModel.findOne({ email: google.data.email });
            if (user) {
                const TokenData = {
                    id: user._id,
                    email: user.email,
                };
                //  Generate Token
                const token = yield (0, utility_1.signToken)(TokenData);
                const userData = {
                    user,
                    token,
                };
                res.status(200).send({ message: "Login successfully", userData });
            }
            else {
                const code = randomstring_1.default.generate({
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
                user = yield models_1.BuyerModel.create(userObject);
                const TokenData = {
                    id: user._id,
                    email: user.email,
                };
                //  Generate Token
                const token = yield (0, utility_1.signToken)(TokenData);
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
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error", error });
        }
    });
}
exports.googleAuth = googleAuth;
/**
 * @description Update Buyer Profile
 * @method GET
 * @route /api/buyers/confirm/:confirmationCode
 * @access private/buyers
 */
exports.updateBuyerProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield models_1.BuyerModel.findById(req.user.id);
    const { firstName, lastName, phone, address } = req.body;
    if (buyer) {
        buyer.firstName = firstName || buyer.firstName;
        buyer.lastName = lastName || buyer.lastName;
        // buyer.image = image || buyer.image;
        buyer.address = address || buyer.address;
        buyer.phone = phone || buyer.phone;
        const updatedBuyer = yield buyer.save();
        res.status(200).send({
            msg: 'Profile updated successfully',
            updatedBuyer,
        });
    }
    else {
        res.status(404).send('Buyer not found');
    }
}));
/**
 * @description Buyer Forgot Password
 * @method POST
 * @route /api/buyers/forgotpassword
 * @access public
 */
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const checkEmail = yield models_1.BuyerModel.findOne({ email });
        if (!checkEmail) {
            return res.status(400).json({
                message: "No User With This Email"
            });
        }
        const secret = process.env.JWT_SECRET + checkEmail.password;
        const payload = {
            email: checkEmail.email,
            id: checkEmail.id
        };
        const name = `${checkEmail.firstName} ${checkEmail.lastName}`;
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '5m' });
        const link = `${process.env.BASE_URL}/reset-password/${checkEmail.id}/${token}`;
        const message = `<h1>Reset Password</h1>
    <h2>Hello ${name}</h2>
    <p>Please Reset Your Password</p>
    <a href=${process.env.BASE_URL}/reset-password/${checkEmail.id}/${token}> Click here</a>`;
        const subject = 'Please Reset Your Password';
        let ress = yield (0, MailerUtility_1.sendConfirmationEmail)(name, checkEmail.email, subject, message);
        if (ress !== null) {
            return res.status(200).json({
                message: 'Rest Password Link Sent successfully! Please check your mail',
                reset_link: link
            });
        }
        else {
            return res.status(400).json({
                message: 'Something went wrong! Please try again'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error Sending Reset Password Email"
        });
    }
});
exports.forgotPassword = forgotPassword;
/**
 * @description Buyer Reset Password
 * @method POST
 * @route /api/buyers/restpassword
 * @access public
 */
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        const { password, confirmPassword } = req.body;
        const user = yield models_1.BuyerModel.findById(id).exec();
        if (user === null) {
            return res.status(400).json({
                message: "No User With This Id"
            });
        }
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (confirmPassword !== password) {
            return res.status(400).json({
                message: "Passwords Do Not Match"
            });
        }
        const newpassword = yield bcrypt.hash(password, 10);
        console.log(newpassword);
        user.password = newpassword;
        yield user.save();
        return res.status(200).json({
            message: "Password Reset Successfully!"
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error Reseting Password"
        });
    }
});
exports.resetPassword = resetPassword;
