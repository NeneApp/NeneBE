export interface IGetCategoryQuery {
  page: string;
  limit: string;
  orderBy: string;
  filter: string;
}

export interface IGetCategoryParams {
  categoryName: string;
}

export interface productAttribute {
  size?: string;
  color?: string;
  height?: string;
  weight?: string;
}
