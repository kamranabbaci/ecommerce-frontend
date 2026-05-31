import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ToastService } from '../../services/toast';
import { ConfirmService } from '../../services/confirm';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  isEditMode = false;

  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stock: 0,
    categoryId: 0,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private confirmService: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data.products),
      error: (err) => console.error('Product load error:', err),
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Category load error:', err),
    });
  }

  saveProduct(): void {
    if (this.product.categoryId === 0) {
      this.toastService.show('Please select category', 'warning');
      return;
    }

    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.toastService.show('Product updated successfully', 'success');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => console.error('Update error:', err),
      });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: () => {
          this.toastService.show('Product added successfully', 'success');
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => console.error('Add error:', err),
      });
    }
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.product = { ...product };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async deleteProduct(id: number): Promise<void> {
    const confirmed = await this.confirmService.confirm(
      'Delete Product?',
      'This product will be permanently removed from your store.',
      'Yes, Delete',
      'Cancel',
    );

    if (!confirmed) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toastService.show('Product deleted successfully', 'success');
        this.loadProducts();
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.toastService.show('Failed to delete product', 'danger');
      },
    });
  }

  resetForm(): void {
    this.isEditMode = false;

    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      stock: 0,
      categoryId: 0,
    };
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'N/A';
  }
}
