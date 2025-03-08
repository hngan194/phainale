import { Component } from '@angular/core';

@Component({
  selector: 'app-signin-account',
  standalone: false,
  templateUrl: './signin-account.component.html',
  styleUrl: './signin-accountcomponent.css'
})
export class SigninAccountComponent {
  data = {
    totalOrder: 100,
    email: "user@example.com"
  };

  logout() {
    alert("Đăng xuất thành công!");
  }
}
