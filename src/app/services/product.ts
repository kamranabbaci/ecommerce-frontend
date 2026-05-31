import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductQueryResult } from '../models/product-query-result';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5125/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(
    search: string = '',
    categoryId: number = 0,
    pageNumber: number = 1,
    pageSize: number = 8,
  ): Observable<ProductQueryResult> {
    return this.http.get<ProductQueryResult>(
      `${this.apiUrl}?search=${search}&categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
