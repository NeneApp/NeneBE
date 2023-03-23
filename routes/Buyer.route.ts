import express from 'express';
import {
  RegisterBuyer,
  verifyBuyer,
} from '../controllers/Buyer.controller';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/register', RegisterBuyer);
router.get('/confirm/:confirmationCode', verifyBuyer);

export default router;