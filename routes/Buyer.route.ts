import express from 'express';
import {
  RegisterBuyer,
  verifyBuyer,
  buyerLogin,
  googleAuth,
  updateBuyerProfile,
  forgotPassword,
  resetPassword
} from '../controllers/Buyer.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();


router.post('/register', RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/login', buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateBuyerProfile)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;