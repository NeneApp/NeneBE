import { productAttribute } from "./Category.dto";

export interface IGetBrandParams {
  brandName: string;
}

export interface IGetBrandQuery {
  page: string;
  limit: string;
}

export interface IUpdateVendorProductBody {
  name?: string;
  brand?: string;
  quantity?: number;
  description?: string;
  prize?: number;
  discount?: number;
  size?: string;
  color?: string;
  weight?: string;
  height?: string;
  category?: string;
  productType?: string;
}
