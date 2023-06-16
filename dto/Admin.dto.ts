export interface CreateVendorInput {
  firstName: string;
  lastName: string;
  password: string;
  businessName: string;
  email: string;
  phone: string;
  image: string;
  activated?: string;
  address: string
}
