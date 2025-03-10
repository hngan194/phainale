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

  openPopup(type: string) {
    this.popupService.openPopup(type);
  }

  closePopup() {
    this.popupService.closePopup();
  }
}
