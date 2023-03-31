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

import validate from '../middlewares/validateResource';

import { Authenticate } from '../middlewares';
import { buyerLoginInputSchema } from '../dto';

const router = express.Router();

router.post('/register', RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/login', validate(buyerLoginInputSchema), buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateBuyerProfile)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;