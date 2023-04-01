"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const VendorSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLenght: [8, 'Password must be at least 6 characters'],
    },
    businessName: {
        type: String,
        required: [true, 'Please enter your business name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a vaild email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    image: {
        type: String,
    },
    address: { type: String, required: true },
    slug: String,
    confirmationCode: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    role: {
        type: String,
        default: 'Vendor',
    },
    activated: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// create slug from business name
// VendorSchema.pre('save', function (next) {
//   this.slug = slugify(this.businessName, { lower: true });
// });
// Encrypt password with bcrypt
VendorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified('password'))
                return next();
            this.password = yield bcrypt_1.default.hash(this.password, 12);
        }
        catch (error) {
            throw new Error(error);
        }
    });
});
const VendorModel = mongoose_1.default.model('Vendor', VendorSchema);
exports.default = VendorModel;
