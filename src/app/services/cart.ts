import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';

  private cartCountSubject = new BehaviorSubject<number>(this.getCount());
  cartCount$ = this.cartCountSubject.asObservable();

  getCartItems(): CartItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartCountSubject.next(this.getCount());
  }

  addToCart(product: Product): void {
    const items = this.getCartItems();

    const existing = items.find((x) => x.product.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }

    this.saveCart(items);
  }

  removeItem(productId: number): void {
    const items = this.getCartItems().filter((x) => x.product.id !== productId);
    this.saveCart(items);
  }

  increaseQuantity(productId: number): void {
    const items = this.getCartItems();
    const item = items.find((x) => x.product.id === productId);

    if (item) item.quantity++;

    this.saveCart(items);
  }

  decreaseQuantity(productId: number): void {
    const items = this.getCartItems();
    const item = items.find((x) => x.product.id === productId);

    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart(items);
    }
  }

  getTotal(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getCount(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
    this.cartCountSubject.next(0);
  }
}
