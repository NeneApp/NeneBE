import express from 'express';
import {
  RegisterBuyer,
  verifyBuyer,
  buyerLogin,
  googleAuth,
  updateBuyerProfile,
  resendBuyerVerificionLink
} from '../controllers/Buyer.controller';
import validate from '../middlewares/validateResource';
import { Authenticate } from '../middlewares';
import { BuyerRegisterInputSchema } from '../dto/Buyer.dto';
import { buyerLoginInputSchema } from '../dto';

const router = express.Router();


router.post('/register', validate(BuyerRegisterInputSchema), RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/resend-confirm', resendBuyerVerificionLink);
router.post('/login', validate(buyerLoginInputSchema), buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateBuyerProfile)

export default router;
