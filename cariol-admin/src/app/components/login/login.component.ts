import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj = { email: '', password: '' };
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.loginObj.email === 'admin@example.com' && this.loginObj.password === 'admin123') {
      this.router.navigate(['/dashboard']); // Chuyển đến dashboard sau khi đăng nhập
    } else {
      this.errorMessage = 'Sai tài khoản hoặc mật khẩu';
    }
  }
}
