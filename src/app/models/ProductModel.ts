import {ProductImageModel} from './ProductImageModel';

export interface ProductModel {
  id?: number;
  categoryId: number;
  name: string;
  description: string;
  shortDescription: string;
  additionalInfo: string;
  badge: string;
  price: number;
  priceOld: number;
  stars: number;
  productImageList: ProductImageModel[];
}
