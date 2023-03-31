import { object, string, TypeOf } from 'zod';

export const VendorRegisterInputSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    businessName: string({
      required_error: 'Business Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    phone: string({
      required_error: 'Phone is required',
    }),
    address: string({
      required_error: 'Phone is required',
    }),
  }),
});

// export const buyerLoginInputSchema = object({
//   body: object({
//     email: string({
//       required_error: 'Email is required',
//     }).email('Not a valid email address'),
//     password: string({
//       required_error: 'Password is required',
//     }).min(6, 'Password too short - should be atleast 8 characters'),
//   }),
// });

export interface IVendorUpdateInput {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  image?: string;
  phone?: string;
  address?: string;
}

export interface IVendorPayload {
  _id: string;
}

export interface IVendorLogin{
  email: string;
  password: string;
}

export type IVendorRegisterInput = TypeOf<typeof VendorRegisterInputSchema>;

export interface IVendorResetPassword{
  password: string;
  confirmPassword: string;
}