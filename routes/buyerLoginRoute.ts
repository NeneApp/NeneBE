import {Router} from "express";
import {
    buyerLogin,
    googleAuth,
    updateBuyerProfile
} from "../controllers/buyerLogin.controller"
import {check} from 'express-validator'
const router = Router();

router.post('/login',
check("email", "Please enter a valid email").isEmail(),
check("password", "A valid password is required with atleast 6 characters long").isLength({ min: 6 }).exists(),
// requireUser,
buyerLogin);
router.post('/google', googleAuth);
router.put('/update', updateBuyerProfile)

export default router; 