import express from 'express';
import {
  RegisterVendor,
  UpdateVendorProfile,
  verifyVendor,
  vendorLogin,
  resendVendorVerificionLink,
  googleAuth,
  forgotPassword,
  resetPassword,
  CreateProduct,
  addCategory,
  addSubCategory
} from '../controllers/Vendor.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();

// , validate(VendorRegisterInputSchema)

router.post('/register', RegisterVendor); 
router.get('/confirm/:confirmationCode', verifyVendor);
router.post('/resend-confirm', resendVendorVerificionLink);
router.put('/profile', Authenticate, UpdateVendorProfile);
router.post('/login', vendorLogin);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);
router.post('/create_product', CreateProduct);
router.post('/add_category', addCategory);
router.post('/:categoryId/add_sub_category', addSubCategory);

export default router;
