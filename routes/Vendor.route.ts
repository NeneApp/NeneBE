import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
  vendorLogin,
  googleAuth
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/register', validate(VendorRegisterInputSchema), RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);

router.put('/profile', Authenticate, UpdateVendorProfile);
router.post('/login', vendorLogin);
router.post('/google', googleAuth);

export default router;
