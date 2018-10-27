import {CategoryModel} from "./CategoryModel";

export interface CategoriesModel {
  categories: CategoryModel[];
  isFetching: boolean;
  error: string;
}
