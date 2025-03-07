import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  currentPopup: string | null = null;

  openPopup(type: string) {
    console.log(`🔹 Mở popup: ${type}`);
    this.currentPopup = type;
  }

  closePopup() {
    console.log('🔹 Đóng popup');
    this.currentPopup = null;
  }

  isPopupOpen(): boolean {
    return this.currentPopup !== null;
  }

  isCartOpen(): boolean {
    return this.currentPopup === 'cart';
  }
}
