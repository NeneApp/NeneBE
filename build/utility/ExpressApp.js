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
const express_1 = __importDefault(require("express"));
const Vendor_route_1 = __importDefault(require("../routes/Vendor.route"));
const Buyer_route_1 = __importDefault(require("../routes/Buyer.route"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const middlewares_1 = require("../middlewares");
const hpp_1 = __importDefault(require("hpp"));
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    // Sanitize data
    app.use((0, express_mongo_sanitize_1.default)());
    // Set security headers
    app.use((0, helmet_1.default)());
    // Prevent http para
    app.use((0, hpp_1.default)());
    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    });
    app.use('/api/vendors', Vendor_route_1.default);
    app.use('/api/buyers', Buyer_route_1.default);
    // Error handler
    app.use(middlewares_1.notFound);
    app.use(middlewares_1.errorHandler);
    return app;
});
