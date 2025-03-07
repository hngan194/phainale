import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchPopup = new EventEmitter<string>();

  switchTo(type: string) {
    this.switchPopup.emit(type);
  }

  closePopup() {
    this.close.emit();
  }
}
