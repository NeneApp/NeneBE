import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/register', RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);

router.put('/profile', Authenticate, UpdateVendorProfile);

export default router;
