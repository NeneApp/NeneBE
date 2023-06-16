<<<<<<< HEAD
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

export interface IVendorResendConfirm{
  email: string;
}

export interface IVendorResetPassword{
  password: string;
  confirmPassword: string;
}

export interface IVendorCreateProduct{
  name: string;
  store_id: string;
  brand: string;
  product_type: string;
  quantity: number;
  description: string;
  code: string;
  slug: string;
  prize: number;
  discount: number;
  attribute: [];
  is_sold: boolean;
  category: string;
}

export interface IVendorCategory{
  name: string;
}

export interface IVendorAddSub{
  name: string;
}

export type IVendorRegisterInput = TypeOf<typeof VendorRegisterInputSchema>;

=======
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

export interface IVendorResendConfirm{
  email: string;
}

export interface IVendorResetPassword{
  password: string;
  confirmPassword: string;
}

export interface IVendorCreateProduct{
  name: string;
  store_id: string;
  brand: string;
  product_type: string;
  quantity: number;
  description: string;
  attribute: string;
  code: string;
  slug: string;
  prize: number;
  discount: number;
  size?: string;
  color?: string;
  weight?: string;
  height?: string;
  is_sold: boolean;
  category: string;
  subCategory?: string;
}

export interface IVendorCategory{
  name: string;
}

export interface IVendorAddSub{
  name: string;
}

export type IVendorRegisterInput = TypeOf<typeof VendorRegisterInputSchema>;

>>>>>>> 08b87137c6917c6ef3350ec59a93ec2f976b6ab1
