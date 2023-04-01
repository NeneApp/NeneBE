import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
  vendorLogin,
  resendVendorVerificionLink,
  googleAuth,
  forgotPassword,
  resetPassword
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();

// validate(VendorRegisterInputSchema),
router.post('/register', RegisterVendor); 
router.get('/confirm/:confirmationCode', verifyVendor);
router.post('/resend-confirm', resendVendorVerificionLink);
router.put('/profile', Authenticate, UpdateVendorProfile);
router.post('/login', vendorLogin);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;
