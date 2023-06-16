import VendorModel from '../models/Vendor.model';

// Get Vendor by IS
export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await VendorModel.findOne({ email });
  } else {
    return await VendorModel.findById(id);
  }
};
