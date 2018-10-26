import {CategoryModel} from "./CategoryModel";

export interface CategoryModels {
  categories: CategoryModel[];
  isFetching: boolean;
  error: string;
}
