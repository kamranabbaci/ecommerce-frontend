import { Product } from './product';

export interface ProductQueryResult {
  products: Product[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
