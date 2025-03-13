import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  apiUrl = 'http://localhost:3002/auth';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService  // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Đăng nhập
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.http.post<any>(`${this.apiUrl}/login-admin`, loginData).subscribe({
      next: (response) => {
        // Lưu thông tin đăng nhập vào AuthService
        this.authService.login(response.token, response.role, response.username, response.last_name);

        // Log thông tin đăng nhập vào console
        console.log(`Đang đăng nhập với Gmail: ${response.email} và Role: ${response.role} và tên: ${response.last_name} `);

        // Điều hướng tới trang Dashboard sau khi đăng nhập thành công
        alert('🎉 Chào mừng đến với trang quản lý!');
        this.router.navigate(['/dashboard']); // Điều hướng tới trang Dashboard
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Email hoặc mật khẩu không đúng!';
      }
    });
  }
}

