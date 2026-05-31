import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {
  orders: Order[] = [];
  selectedOrder?: Order;

  statuses: string[] = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Order load error:', err),
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

  updateStatus(order: Order): void {
    if (!order.id || !order.orderStatus) {
      return;
    }

    this.orderService.updateOrderStatus(order.id, order.orderStatus).subscribe({
      next: () => {
        this.toastService.show('Order status updated successfully', 'success');
        this.loadOrders();
      },
      error: (err) => {
        console.error('Status update error:', err);
        this.toastService.show('Failed to update order status', 'danger');
      },
    });
  }
}
