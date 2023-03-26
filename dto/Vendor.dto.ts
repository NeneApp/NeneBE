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

export interface IVendorPayload {
  _id: string;
}

export interface IVendorLogin{
  email: string;
  password: string;
}

export interface IVendorResetPassword{
  email: string;
}