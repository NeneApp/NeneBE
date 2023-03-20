import {Router} from "express";
import {login} from "../controllers/auth.buyerLoginController"

const auth = Router();

auth.post('/buyerLogin', login);

export default auth;