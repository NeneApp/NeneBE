import express from 'express';
import { RegisterVendor, UpdateVendorProfile, verifyVendor } from '../controllers/Vendor.controller';

const router = express.Router();

router.post('/register', RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);
router.put('/profile', UpdateVendorProfile)

export default router;
