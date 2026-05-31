import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/category';
import { ConfirmService } from '../../services/confirm';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories implements OnInit {
  categories: Category[] = [];
  isEditMode = false;

  category: Category = {
    id: 0,
    name: '',
  };

  constructor(
    private categoryService: CategoryService,
    private confirmService: ConfirmService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Category load error:', err),
    });
  }

  saveCategory(): void {
    if (!this.category.name.trim()) {
      this.toastService.show('Please enter category name', 'warning');
      return;
    }

    if (this.isEditMode) {
      this.categoryService.updateCategory(this.category.id, this.category).subscribe({
        next: () => {
          this.toastService.show('Category updated successfully', 'success');
          this.resetForm();
          this.loadCategories();
        },
        error: (err) => console.error('Update category error:', err),
      });
    } else {
      this.categoryService.addCategory(this.category).subscribe({
        next: () => {
          this.toastService.show('Category added successfully', 'success');
          this.resetForm();
          this.loadCategories();
        },
        error: (err) => console.error('Add category error:', err),
      });
    }
  }

  editCategory(category: Category): void {
    this.isEditMode = true;
    this.category = { ...category };
  }

  async deleteCategory(id: number): Promise<void> {
    const confirmed = await this.confirmService.confirm(
      'Delete Category?',
      'This category will be removed. If products are using it, deletion may fail.',
      'Yes, Delete',
      'Cancel',
    );

    if (!confirmed) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.toastService.show('Category deleted successfully', 'danger');
        this.loadCategories();
      },
      error: (err) => {
        console.error('Delete category error:', err);
        this.toastService.show(
          'Category cannot be deleted because products are using it',
          'warning',
        );
      },
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.category = {
      id: 0,
      name: '',
    };
  }
}
