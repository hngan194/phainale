import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
  standalone: false
})
export class CartDetailComponent implements OnInit {
  cartItems: any[] = [];
  hover: boolean = false;
  product: any;
  quantity: number = 1;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Lấy dữ liệu từ CartService
  }

  changeQuantity(item: any, change: number): void {
    item.quantity += change;
    if (item.quantity < 1) {
      this.removeItem(this.cartItems.indexOf(item));
    }
    this.cartService.updateCartCount(); // Cập nhật số lượng trên icon
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems(); // Cập nhật lại giỏ hàng
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  // Cập nhật hàm buyNow() giống như bạn yêu cầu
  buyNow(): void {
    // Kiểm tra sản phẩm đầu tiên trong giỏ hàng
    if (this.cartItems.length > 0) {
      const item = this.cartItems[0]; // Giả sử bạn muốn mua sản phẩm đầu tiên trong giỏ
      if (item && item.amount > 0) {
        this.router.navigate(['/order'], {
          queryParams: {
            id: item._id, // ID của sản phẩm
            quantity: item.quantity, // Số lượng sản phẩm
            color: item.color // Màu sắc của sản phẩm
          }
        });
      }
    }
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
