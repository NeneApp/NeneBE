import { object, string, TypeOf } from 'zod';

export interface IBuyerRegisterInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface IBuyerUpdateInput {
  firstName?: string;
  lastName?: string;
  // image?: string;
  phone?: string;
  address?: string;
}

export interface IBuyerResetPassword{
  password: string;
  confirmPassword: string;
}
export const buyerLoginInputSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be atleast 8 characters'),
  }),
});

export type IbuyerLoginInputSchema = TypeOf<typeof buyerLoginInputSchema>;
