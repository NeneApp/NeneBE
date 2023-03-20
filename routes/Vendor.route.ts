import express from 'express';
import { RegisterVendor, verifyVendor } from '../controllers/Vendor.controller';

const router = express.Router();

router.post('/register', RegisterVendor);
router.get('/confirm/:confirmationCode', verifyVendor);

export default router;
