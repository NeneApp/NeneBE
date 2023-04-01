"use strict";
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
exports.resetPassword = exports.forgotPassword = exports.googleAuth = exports.vendorLogin = exports.UpdateVendorProfile = exports.resendVendorVerificionLink = exports.verifyVendor = exports.RegisterVendor = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Vendor_model_1 = __importDefault(require("../models/Vendor.model"));
const VendorUtility_1 = require("../utility/VendorUtility");
const MailerUtility_1 = require("../utility/MailerUtility");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtUtility_1 = require("../utility/JwtUtility");
const axios_1 = __importDefault(require("axios"));
const randomstring_1 = __importDefault(require("randomstring"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @description Vendor registration
 * @method POST
 * @route /api/vendors=
 * @access public
 */
const RegisterVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, email, businessName, phone, address, } = req.body;
        const existUser = yield Vendor_model_1.default.findOne({ email });
        if (existUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const vendor = yield Vendor_model_1.default.create({
            firstName,
            lastName,
            password,
            phone,
            email,
            businessName,
            slug: (0, VendorUtility_1.GenSlug)(businessName),
            address,
            confirmationCode: yield (0, VendorUtility_1.GenCode)(),
        });
        const name = `${vendor.firstName} ${vendor.lastName}`;
        const userType = 'vendors';
        const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Verify your email address to complete the signup and login to your account</p>
    <a href=${process.env.BASE_URL}/api/${userType}/confirm/${vendor === null || vendor === void 0 ? void 0 : vendor.confirmationCode}> Click here</a>`;
        const subject = 'Please confirm your account';
        let ress = yield (0, MailerUtility_1.sendConfirmationEmail)(name, vendor === null || vendor === void 0 ? void 0 : vendor.email, subject, message);
        if (ress !== null) {
            res.status(200).json({
                msg: 'User created successfully! Please check your mail',
            });
        }
        else {
            return res
                .status(400)
                .json({ message: 'Something went wrong! Please try again' });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.RegisterVendor = RegisterVendor;
/**
 * @description Verify Vendor account
 * @method GET
 * @route /api/vendors/confirm/:confirmationCode
 * @access public
 */
exports.verifyVendor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmationCode } = req.params;
    const confimVendor = yield Vendor_model_1.default.findOne({ confirmationCode });
    if (!confimVendor) {
        res.status(404);
        throw new Error('Invalid Verification Code');
    }
    confimVendor.status = 'Active';
    confimVendor.confirmationCode = '';
    yield confimVendor.save();
    res.status(200).json({
        msg: 'Verification Successful.You can now login in',
    });
}));
/**
 * @description Resend verification link to Vendor's email
 * @method POST
 * @route /api/vendors/resend-confirm
 * @access public
 */
exports.resendVendorVerificionLink = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const vendor = yield Vendor_model_1.default.findOne({ email: email.toLowerCase() });
        if (!vendor) {
            res.status(400);
            throw new Error("user does not exist");
        }
        //send confirmation code to buyer's email
        const name = `${vendor.firstName} ${vendor.lastName}`;
        const userType = "vendors";
        const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Verify your email address to complete the signup and login to your account</p>
    <a href=${process.env.BASE_URL}/api/${userType}/confirm/${vendor === null || vendor === void 0 ? void 0 : vendor.confirmationCode}> Click here</a>`;
        const subject = 'Please confirm your account';
        let ress = yield (0, MailerUtility_1.sendConfirmationEmail)(name, vendor === null || vendor === void 0 ? void 0 : vendor.email, subject, message);
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
/**
 * @description Update Vendor Profile
 * @method GET
 * @route /api/vendors/confirm/:confirmationCode
 * @access private/vendors
 */
exports.UpdateVendorProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield Vendor_model_1.default.findById(req.user._id);
    const { firstName, lastName, businessName, image, phone, address } = req.body;
    if (vendor) {
        vendor.firstName = firstName || vendor.firstName;
        vendor.lastName = lastName || vendor.lastName;
        vendor.businessName = businessName || vendor.businessName;
        vendor.image = image || vendor.image;
        vendor.address = address || vendor.address;
        vendor.phone = phone || vendor.phone;
        if (businessName) {
            vendor.slug = (0, VendorUtility_1.GenSlug)(businessName);
        }
        const updatedVendor = yield vendor.save();
        res.status(200).send({
            msg: 'Profile updated successfully',
            updatedVendor,
        });
    }
    else {
        res.status(404).send('Vendor not found');
    }
}));
/**
 * @description Vendor Login
 * @method POST
 * @route /api/vendors/login
 * @access public
 */
const vendorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const vendor = yield Vendor_model_1.default.findOne({ email: email });
        if (!vendor) {
            res.status(400).json({
                message: "Vendor Not Found"
            });
        }
        const verifyPass = yield bcrypt_1.default.compare(password, vendor.password);
        if (!verifyPass) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
        }
        if (vendor.status !== 'Active') {
            return res.status(400).json({
                message: "Please Activate Your Account By Confirming Your Email Address"
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
            token: yield (0, JwtUtility_1.signToken)({ vendor: vendor._id, role: vendor.role })
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error Logging In",
            Error: error
        });
    }
});
exports.vendorLogin = vendorLogin;
/**
* @description Vendor Google Login
* @method POST
* @route /api/vendors/google
* @access public
*/
function googleAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        let user;
        try {
            const google = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
            user = yield Vendor_model_1.default.findOne({ email: google.data.email });
            if (user) {
                const TokenData = {
                    id: user._id,
                    email: user.email,
                };
                //  Generate Token
                const token = yield (0, JwtUtility_1.signToken)(TokenData);
                const userData = {
                    user,
                    token,
                };
                res.status(200).json({ message: "Login successfully", userData });
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
                user = yield Vendor_model_1.default.create(userObject);
                const TokenData = {
                    id: user._id,
                    email: user.email,
                };
                //  Generate Token
                const token = yield (0, JwtUtility_1.signToken)(TokenData);
                const userData = {
                    user,
                    token,
                };
                if (user) {
                    res.status(201).json({
                        message: "Account created, kindly proceed", userData
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error", error });
        }
    });
}
exports.googleAuth = googleAuth;
/**
 * @description Vendor Forgot Password
 * @method POST
 * @route /api/vendors/forgotpassword
 * @access public
 */
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const checkEmail = yield Vendor_model_1.default.findOne({ email });
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
 * @description Vendor Reset Password
 * @method POST
 * @route /api/vendors/restpassword
 * @access public
 */
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        const { password, confirmPassword } = req.body;
        const user = yield Vendor_model_1.default.findById(id).exec();
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
        const newpassword = yield bcrypt_1.default.hash(password, 10);
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
