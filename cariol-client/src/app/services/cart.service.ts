import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable(); // ✅ Trả về Observable để cập nhật UI
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.cartItems.push({ ...product, quantity: product.quantity || 1 });
    }
    this.updateCartCount();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateCartCount();
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }
  
  updateCartCount() {
    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCount.next(totalQuantity);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
