import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs';

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
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    console.log('🔹 loginForm đã khởi tạo:', this.loginForm.value);
  }

  get f(): { [key: string]: any } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.alertService.clear();

    if (this.loginForm.invalid) {
      console.log('🔸 Form không hợp lệ:', this.loginForm.value);
      return;
    }

    console.log('🔹 Gửi request đăng nhập:', this.loginForm.value);

    this.loading = true;
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log('✅ Đăng nhập thành công:', response);
          localStorage.setItem('user', JSON.stringify(response)); // ✅ Lưu thông tin người dùng vào localStorage
          this.closePopup(); 
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('❌ Lỗi đăng nhập:', error);
          this.errorMessage = 'Sai thông tin đăng nhập! Vui lòng thử lại.';
          this.loading = false;
        }
      });
  }

  switchTo(type: string): void {
    this.switchPopup.emit(type);
  }

  closePopup(): void {
    this.close.emit();
  }
}
