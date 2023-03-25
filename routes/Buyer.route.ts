import express from 'express';
import {
  RegisterBuyer,
  verifyBuyer,
} from '../controllers/Buyer.controller';
import {
  buyerLogin,
  googleAuth,
  updateBuyerProfile
} from "../controllers/buyerLogin.controller"
import {check} from 'express-validator'
import { Authenticate } from '../middlewares';

const router = express.Router();


router.post('/register', RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/login',
check("email", "Please enter a valid email").isEmail(),
check("password", "A valid password is required with atleast 6 characters long").isLength({ min: 6 }).exists(),
buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateBuyerProfile)

export default router;
