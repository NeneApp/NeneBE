import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
  vendorLogin,
  forgotPassword
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/register', RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);

router.put('/profile', Authenticate, UpdateVendorProfile);
router.post('/login', vendorLogin);
router.post('/forgotpassword', forgotPassword);

export default router;
