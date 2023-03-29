import express from 'express';
import {
  RegisterBuyer,
  verifyBuyer,
  buyerLogin,
  googleAuth,
  updateBuyerProfile
<<<<<<< HEAD
} from "../controllers/buyerLogin.controller"
import {check} from 'express-validator';
=======
} from '../controllers/Buyer.controller';
import {check} from 'express-validator'
>>>>>>> 47339523a288c6c734a0eeefeb9ecd591f2d79fd
import { Authenticate } from '../middlewares';

const router = express.Router();


router.post('/register', RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/login', buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateBuyerProfile)

export default router;
