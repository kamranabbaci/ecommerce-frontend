import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  searchText = '';
  selectedCategoryId = 0;

  pageNumber = 1;
  pageSize = 8;
  totalCount = 0;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Category API Error:', err),
    });
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.searchText, this.selectedCategoryId, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.totalCount = response.totalCount;
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalPages = response.totalPages;
        },
        error: (err) => console.error('Product API Error:', err),
      });
  }

  searchProducts(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  changeCategory(): void {
    this.pageNumber = 1;
    this.loadProducts();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.pageNumber = page;
    this.loadProducts();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.show('Product added to cart', 'success');
  }
}
