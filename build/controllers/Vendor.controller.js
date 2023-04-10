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
exports.vendorLogin = exports.UpdateVendorProfile = exports.verifyVendor = exports.RegisterVendor = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Vendor_model_1 = __importDefault(require("../models/Vendor.model"));
const VendorUtility_1 = require("../utility/VendorUtility");
const MailerUtility_1 = require("../utility/MailerUtility");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        res.status(404);
        throw new Error('Vendor not found');
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
        if (email === '' || password === '') {
            return res.status(400).json({
                message: 'Email And Password Is Required',
            });
        }
        const vendor = yield Vendor_model_1.default.findOne({ email: email });
        if (vendor) {
            const verifyPass = yield bcrypt_1.default.compare(password, vendor.password);
            if (verifyPass) {
                const secret = process.env.JWT_SECRET;
                const genToken = jsonwebtoken_1.default.sign({ vendor: vendor }, secret, {
                    expiresIn: '1h',
                });
                const fakePass = undefined;
                vendor.password = fakePass;
                return res.status(200).json({
                    message: 'User Found',
                    result: vendor,
                    token: genToken,
                });
            }
            else {
                return res.status(400).json({
                    message: 'Incorrect Username Or Password',
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'No Such User',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: 'Error Logging In',
            Error: error,
        });
    }
});
exports.vendorLogin = vendorLogin;
