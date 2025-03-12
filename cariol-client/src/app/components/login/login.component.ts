import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() switchPopup = new EventEmitter<string>();

  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  apiUrl = 'http://localhost:3002/auth'; // ✅ URL API Backend

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10,11}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const loginData = {
      phone: this.loginForm.value.phone.trim(),
      password: this.loginForm.value.password.trim()
    };

    console.log("🔍 Kiểm tra tài khoản trước khi đăng nhập:", loginData.phone);

    // 🟢 Kiểm tra xem tài khoản có tồn tại không trước khi gửi API login
    this.http.post(`${this.apiUrl}/check-user`, { phone: loginData.phone }).subscribe({
      next: (response: any) => {
        console.log("🔍 Phản hồi từ API check-user:", response);

        if (!response.exists) {
          console.error("❌ Tài khoản không tồn tại!");
          this.errorMessage = "Tài khoản chưa được đăng ký!";
          this.loading = false;
          return;
        }

        console.log("✅ Tài khoản tồn tại, tiếp tục đăng nhập...");

        // 🟢 Nếu tài khoản tồn tại, tiếp tục gửi API login
        this.http.post(`${this.apiUrl}/login`, loginData).subscribe({
          next: (response: any) => {
            console.log("✅ Đăng nhập thành công! API trả về:", response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            alert('🎉 Đăng nhập thành công! Chào mừng bạn.');
            // ✅ Tự động đóng popup trước khi chuyển hướng
            this.closePopup();

            // ✅ Dùng setTimeout để tránh lỗi UI khi đóng popup và chuyển trang
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 500);

          },
          error: (error) => {
            console.error("❌ Lỗi đăng nhập:", error);
            this.errorMessage = "Số điện thoại hoặc mật khẩu không đúng!";
            this.loading = false;
          }
        });

      },
      error: (error) => {
        console.error("❌ Lỗi kiểm tra tài khoản từ API:", error);
        this.errorMessage = "Lỗi kiểm tra tài khoản. Vui lòng thử lại!";
        this.loading = false;
      }
    });
  }

  switchTo(type: string) {
    this.switchPopup.emit(type);
  }

  closePopup() {
    this.close.emit();
  }
}
