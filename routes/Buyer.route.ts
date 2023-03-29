import express from 'express';
import {
  RegisterBuyer,
  verifyBuyer,
  buyerLogin,
  googleAuth,
  updateBuyerProfile
} from '../controllers/Buyer.controller';
import {check} from 'express-validator'
import { Authenticate } from '../middlewares';

const router = express.Router();


router.post('/register', RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/login', buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateBuyerProfile)

export default router;