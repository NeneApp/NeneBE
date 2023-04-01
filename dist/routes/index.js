"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buyerLoginRoute_1 = __importDefault(require("./buyerLoginRoute"));
const routeHandler = express_1.default.Router();
// Auth route
routeHandler.use("/auth", buyerLoginRoute_1.default);
exports.default = routeHandler;
