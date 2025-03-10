import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  currentPopup: string | null = null;

  openPopup(type: string) {
    this.currentPopup = type;
  }

  closePopup() {
    this.currentPopup = null;
  }

  isPopupOpen(): boolean {
    return this.currentPopup !== null;
  }
}
