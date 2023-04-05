"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Vendor_controller_1 = require("../controllers/Vendor.controller");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
// , validate(VendorRegisterInputSchema)
router.post('/register', Vendor_controller_1.RegisterVendor);
router.get('/confirm/:confirmationCode', Vendor_controller_1.verifyVendor);
router.post('/resend-confirm', Vendor_controller_1.resendVendorVerificionLink);
router.put('/profile', middlewares_1.Authenticate, Vendor_controller_1.UpdateVendorProfile);
router.post('/login', Vendor_controller_1.vendorLogin);
router.post('/google', Vendor_controller_1.googleAuth);
router.post('/forgot-password', Vendor_controller_1.forgotPassword);
router.post('/reset-password/:id/:token', Vendor_controller_1.resetPassword);
router.post('/create_product', Vendor_controller_1.CreateProduct);
router.post('/add_category', Vendor_controller_1.addCategory);
router.post('/:categoryId/add_sub_category', Vendor_controller_1.addSubCategory);
exports.default = router;
