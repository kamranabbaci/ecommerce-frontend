import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  address = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  getTotal(): number {
    return this.cartService.getTotal();
  }

  placeOrder(): void {
    const cartItems = this.cartService.getCartItems();

    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    const order: Order = {
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      address: this.address,
      totalAmount: this.cartService.getTotal(),
      orderItems: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        // alert('Order placed successfully');
        this.toastService.show('Order placed successfully', 'success');
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(err);
        // alert('Order failed');
        this.toastService.show('Order failed', 'danger');
      },
    });
  }
}
