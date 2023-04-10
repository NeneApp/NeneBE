"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Buyer_controller_1 = require("../controllers/Buyer.controller");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/register', Buyer_controller_1.RegisterBuyer);
router.get('/confirm/:confirmationCode', Buyer_controller_1.verifyBuyer);
router.post('/login', Buyer_controller_1.buyerLogin);
router.post('/google', Buyer_controller_1.googleAuth);
router.put('/update', middlewares_1.Authenticate, Buyer_controller_1.updateBuyerProfile);
exports.default = router;
