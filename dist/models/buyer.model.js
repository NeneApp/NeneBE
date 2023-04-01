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
const BuyerSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please, enter a valid email",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        trim: true,
        match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
        select: false,
    },
    image: {
        type: String,
    },
    address: { type: String },
    gender: {
        type: String,
        enums: ["m", "f", "others"],
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending",
    },
}, {
    timestamps: true,
});
// Encrypt password with bcrypt
BuyerSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified("password"))
                return next();
            this.password = yield bcrypt_1.default.hash(this.password, 12);
            // this.confirmationCode = await bcrypt.hash(
            //   this.password,
            //   process.env.HASH_SALT || 10
            // );
        }
        catch (error) {
            throw new Error(error);
        }
    });
});
const BuyerModel = mongoose_1.default.model("Buyer", BuyerSchema);
exports.default = BuyerModel;
