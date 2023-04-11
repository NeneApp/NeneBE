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
import validate from '../middlewares/validateResource';
import { VendorRegisterInputSchema } from '../dto';

const router = express.Router();

router.post('/register', validate(VendorRegisterInputSchema), RegisterVendor); 
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
