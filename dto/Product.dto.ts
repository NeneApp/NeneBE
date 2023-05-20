import { productAttribute } from "./Category.dto";

export interface IGetBrandParams {
  brandName: string;
}

export interface IGetBrandQuery {
  page: string;
  limit: string;
}

export interface ISearchParams {
  name: string;
}

export interface ISearchQuery {
  keyword: string;
  name: string;
  product_type: string;
  size: string;
  colour: string;
  body_fit: string;
  price_range: number;
}

export interface IMatch {
  name: RegExp;
  product_type: RegExp;
}
export interface IsortPriceParams {
  price: number
 
}
export interface ISortPriceQuery {
  colour: string;
  body_fit: string;
  price: number;
  sort: any;
  page: string;
  limit: string;
  name: string;
  product_type: string;
  price_range: string;
  size: any;
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
