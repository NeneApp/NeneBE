import { object, string, TypeOf } from 'zod';

export const BuyerRegisterInputSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }),
});

export interface IBuyerUpdateInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

export type IBuyerRegisterInput = TypeOf<typeof BuyerRegisterInputSchema>;

export interface IBuyerResendConfirm{
  email: string;
}

