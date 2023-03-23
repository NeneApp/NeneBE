import {Router} from "express";
import {buyerLogin} from "../controllers/buyer.controller"
import {check} from 'express-validator'
const buyerRoute = Router();

buyerRoute.post('/buyerLogin',
check("email", "Please enter a valid email").isEmail(),
check("password", "A valid password is required with atleast 6 characters long").isLength({ min: 6 }).exists(),
// requireUser,
buyerLogin);

export default buyerRoute; 