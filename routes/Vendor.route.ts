import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
  VendorLogin,
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';
import validate from '../middlewares/validateResource';
import { VendorRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(VendorRegisterInputSchema), RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);
router.post('/login', VendorLogin);

router.put('/profile', Authenticate, UpdateVendorProfile);

export default router;
