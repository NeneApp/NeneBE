export interface IVendorRegisterInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  businessName: string;
  image: string;
  phone: string;
  address: string;
}

export interface IVendorUpdateInput {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  image?: string;
  phone?: string;
  address?: string;
}