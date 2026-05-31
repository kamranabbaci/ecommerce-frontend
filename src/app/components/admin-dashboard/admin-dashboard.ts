import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { OrderService } from '../../services/order';

import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Order } from '../../models/order';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  orders: Order[] = [];

  totalProducts = 0;
  totalCategories = 0;
  totalOrders = 0;
  totalRevenue = 0;

  pendingOrders = 0;
  confirmedOrders = 0;
  shippedOrders = 0;
  deliveredOrders = 0;
  cancelledOrders = 0;

  recentOrders: Order[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productService.getProducts('', 0, 1, 1000).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.totalCount;
      },
      error: (err) => console.error('Dashboard product error:', err),
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.totalCategories = data.length;
      },
      error: (err) => console.error('Dashboard category error:', err),
    });
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.calculateOrderStats();
      },
      error: (err) => console.error('Dashboard order error:', err),
    });
  }

  calculateOrderStats(): void {
    this.totalOrders = this.orders.length;

    this.totalRevenue = this.orders
      .filter((order) => order.orderStatus !== 'Cancelled')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    this.pendingOrders = this.orders.filter((x) => x.orderStatus === 'Pending').length;
    this.confirmedOrders = this.orders.filter((x) => x.orderStatus === 'Confirmed').length;
    this.shippedOrders = this.orders.filter((x) => x.orderStatus === 'Shipped').length;
    this.deliveredOrders = this.orders.filter((x) => x.orderStatus === 'Delivered').length;
    this.cancelledOrders = this.orders.filter((x) => x.orderStatus === 'Cancelled').length;

    this.recentOrders = this.orders.slice(0, 5);
  }

  getOrderItemsCount(order: Order): number {
    return order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
