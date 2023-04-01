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
exports.signToken = exports.ValidateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateJwt = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get('Authorization');
    if (signature) {
        const payload = yield jsonwebtoken_1.default.verify(signature.split(' ')[1], process.env.JWT_SECRET);
        req.user = payload;
        return true;
    }
    return false;
});
exports.ValidateJwt = ValidateJwt;
const genToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // generate new jwt token for registeration
    token = jsonwebtoken_1.default.sign(Object.assign({}, data), process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
});
const signToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield genToken(Object.assign({}, data));
    return token;
});
exports.signToken = signToken;
