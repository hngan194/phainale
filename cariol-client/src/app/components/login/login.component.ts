import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() switchPopup = new EventEmitter<string>();
  @Output() loginSuccess = new EventEmitter<void>(); // Emit event after login success

  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  apiUrl = 'http://localhost:3002/auth';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
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

    this.http.post(`${this.apiUrl}/login`, loginData).subscribe({
        next: (response: any) => {
            console.log("🔍 API trả về:", response); // ✅ Kiểm tra API trả về gì

            if (!response || !response.last_name) {
                this.errorMessage = "Dữ liệu đăng nhập không hợp lệ!";
                return;
            }
            
            console.log("✅ Đăng nhập thành công, lưu user vào localStorage:", response);

            // ✅ Lưu dữ liệu đầy đủ vào localStorage
            const userData = {
              first_name: response.first_name || '',
              last_name: response.last_name || '',
              phone: response.phone || '',
              email: response.email || '',
              address: response.address || '',
              city: response.city || '',
              province: response.province || ''
            };

            localStorage.setItem('user', JSON.stringify(userData)); // ✅ Lưu user đúng cách
            const token = response.token;
            localStorage.setItem('token', token); 
            alert(`🎉 Đăng nhập thành công! Chào mừng ${response.last_name}`);


            this.loginSuccess.emit();
            this.closePopup();
        },
        error: (error) => {
            console.error("❌ Lỗi đăng nhập:", error);
            this.errorMessage = "Số điện thoại hoặc mật khẩu không đúng!";
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
