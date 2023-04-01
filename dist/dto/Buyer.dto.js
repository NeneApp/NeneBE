"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerLoginInputSchema = exports.BuyerRegisterInputSchema = void 0;
const zod_1 = require("zod");
exports.BuyerRegisterInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: 'First Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'Last Name is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
    }),
});
exports.buyerLoginInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be atleast 8 characters'),
    }),
});
