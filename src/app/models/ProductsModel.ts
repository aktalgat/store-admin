import { ProductModel } from './ProductModel';

export interface ProductsModel {
  products: ProductModel[];
  isFetching: boolean;
  error: string;
}
