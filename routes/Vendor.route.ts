import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
  vendorLogin,
  forgotPassword,
  resetPassword
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';
import { check } from 'express-validator';

const router = express.Router();

router.post('/register', RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);

router.put('/profile', Authenticate, UpdateVendorProfile);
router.post('/login', 
check("email", "Please enter a valid email").isEmail(),
check("password", "A valid password is required with atleast 6 characters long").isLength({ min: 6 }).exists(),
vendorLogin);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:email', resetPassword)

export default router;
