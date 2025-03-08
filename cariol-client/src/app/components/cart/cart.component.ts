import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';  // Đảm bảo import đúng PopupService

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = [
    { name: 'Premium Canvas Backpack', category: 'Kem', image: 'assets/images/backpack1.png', price: 590000, quantity: 1 },
    { name: 'Basic White T-Shirt', category: 'Thời trang', image: 'assets/images/tshirt.png', price: 150000, quantity: 2 }
  ];

  constructor(private popupService: PopupService) {}

  openCart() {
    this.popupService.openPopup('cart');  // Mở giỏ hàng
  }

  // Hàm đóng giỏ hàng
  closeCart(): void {
    this.popupService.closePopup();  // Đóng giỏ hàng thông qua PopupService
  }

  // Thay đổi số lượng sản phẩm
  changeQuantity(item: any, change: number): void {
    item.quantity += change;
    if (item.quantity < 1) {
      item.quantity = 1; // Đảm bảo số lượng không nhỏ hơn 1
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Tính tổng giá trị của giỏ hàng
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
