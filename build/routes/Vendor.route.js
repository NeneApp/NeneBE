"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Vendor_controller_1 = require("../controllers/Vendor.controller");
const middlewares_1 = require("../middlewares");
const validateResource_1 = __importDefault(require("../middlewares/validateResource"));
const dto_1 = require("../dto");
const router = express_1.default.Router();
router.post('/register', (0, validateResource_1.default)(dto_1.VendorRegisterInputSchema), Vendor_controller_1.RegisterVendor);
router.get('/confirm/:confirmationCode', Vendor_controller_1.verifyVendor);
router.put('/profile', middlewares_1.Authenticate, Vendor_controller_1.UpdateVendorProfile);
router.post('/login', Vendor_controller_1.vendorLogin);
exports.default = router;
