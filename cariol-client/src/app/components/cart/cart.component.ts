import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';  
import { Router } from '@angular/router';  // Import Router
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    public popupService: PopupService,  // Đổi private -> public
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {
    this.cartItems = this.cartService.getCartItems(); // Lấy giỏ hàng từ CartService
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Lấy giỏ hàng khi component được khởi tạo
  }

  openCart() {
    this.popupService.openPopup('cart');
  }

  closeCart(): void {
    this.popupService.closePopup();
  }

  changeQuantity(item: any, change: number): void {
    item.quantity += change;
    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }

  removeItem(item: any): void {
    this.cartService.removeItem(item); // Xóa sản phẩm khỏi service
    this.cartItems = this.cartService.getCartItems(); // Cập nhật danh sách hiển thị
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  goToCartDetail() {
    this.popupService.closePopup(); // Đóng popup trước
    setTimeout(() => {
      this.router.navigate(['/cart-detail']); // Điều hướng sau khi đóng
    }, 100); // Đợi 100ms để tránh lỗi
  }

  // Hàm buyNow() giống như yêu cầu
  buyNow(): void {
    // Kiểm tra sản phẩm đầu tiên trong giỏ hàng
    if (this.cartItems.length > 0) {
      this.popupService.closePopup();
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
}
