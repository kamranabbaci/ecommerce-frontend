import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.loadCart();
  }

  loadCart() {
    this.items = this.cartService.getCartItems();
  }

  increase(id: number) {
    this.cartService.increaseQuantity(id);
    this.loadCart();
  }

  decrease(id: number) {
    this.cartService.decreaseQuantity(id);
    this.loadCart();
  }

  remove(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
