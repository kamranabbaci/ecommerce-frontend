import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orders: Order[] = [];
  selectedOrder?: Order;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadMyOrders();
  }

  loadMyOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => {
        console.error('My orders error:', err);
        alert('Please login to view your orders');
      },
    });
  }

  viewOrder(order: Order): void {
    this.selectedOrder = order;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeDetails(): void {
    this.selectedOrder = undefined;
  }

  getOrderItemsCount(order: Order): number {
    return order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
