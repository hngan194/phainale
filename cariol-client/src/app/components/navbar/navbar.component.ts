import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public popupService: PopupService) {}

  get currentPopup() {
    return this.popupService.currentPopup;
  }

  isPopupOpen() {
    return this.popupService.isPopupOpen();
  }

  openPopup(type: string) {
    this.popupService.openPopup(type);
  }

  closePopup() {
    this.popupService.closePopup();
  }

  toggleCart() {
    if (this.popupService.isCartOpen()) {
      console.log('🔹 Đóng giỏ hàng');
      this.closePopup();
    } else {
      console.log('🔹 Mở giỏ hàng');
      this.openPopup('cart');
    }
  }
}
