import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchPopup = new EventEmitter<string>();

  switchTo(type: string) {
    this.switchPopup.emit(type);
  }

  closePopup() {
    this.close.emit();  // ✅ Gọi emit() thay vì gọi close()
  }
}
