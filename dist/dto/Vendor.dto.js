"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRegisterInputSchema = void 0;
const zod_1 = require("zod");
exports.VendorRegisterInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: 'First Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'Last Name is required',
        }),
        businessName: (0, zod_1.string)({
            required_error: 'Business Name is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
        phone: (0, zod_1.string)({
            required_error: 'Phone is required',
        }),
        address: (0, zod_1.string)({
            required_error: 'Phone is required',
        }),
    }),
});
