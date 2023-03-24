export interface IBuyerRegisterInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface IBuyerUpdateInput {
  firstName?: string;
  lastName?: string;
  image?: string;
  phone?: string;
  address?: string;
}
