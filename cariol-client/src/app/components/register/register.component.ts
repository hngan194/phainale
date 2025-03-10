import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() switchPopup = new EventEmitter<string>();

  registerForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10,11}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f(): { [key: string]: any } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("❌ Form không hợp lệ:", this.registerForm.value);
      this.errorMessage = "Vui lòng điền đầy đủ thông tin!";
      return;
    }

    const registerData = {
      last_name: this.registerForm.get('last_name')?.value.trim(),
      first_name: this.registerForm.get('first_name')?.value.trim(),
      phone: this.registerForm.get('phone')?.value.trim(),
      email: this.registerForm.get('email')?.value.trim(),
      password: this.registerForm.get('password')?.value.trim()
    };

    console.log("🔹 Kiểm tra tài khoản trong database trước khi đăng ký:", registerData);

    // 🔹 Kiểm tra số điện thoại hoặc email đã tồn tại trong database
    this.authService.checkUserExists(registerData.phone, registerData.email).subscribe({
      next: (response) => {
        console.log("🔹 Phản hồi từ API check-user:", response);
    
        if (response.exists) {
          console.error("❌ Lỗi: Số điện thoại hoặc email đã tồn tại!");
          this.errorMessage = "Số điện thoại hoặc email đã được đăng ký!";
          return;
        }
    
        console.log("✅ Tài khoản chưa tồn tại, tiếp tục gửi API đăng ký...");
        this.authService.register(registerData)
          .pipe(first())
          .subscribe({
            next: () => {
              console.log("✅ Đăng ký thành công!");
              this.alertService.success("Đăng ký thành công!");
              setTimeout(() => {
                this.closePopup();
                this.router.navigate(['/login']);
              }, 1000);
            },
            error: (error) => {
              console.error("❌ Lỗi từ API đăng ký:", error);
              this.errorMessage = "Không thể tạo tài khoản. Vui lòng thử lại!";
            }
          });
      },
      error: (error) => {
        console.error("❌ Lỗi kiểm tra tài khoản từ API:", error);
        if (error.status === 400) {
          this.errorMessage = "Số điện thoại hoặc email đã được đăng ký!";
        } else {
          this.errorMessage = "Lỗi kiểm tra tài khoản. Vui lòng thử lại!";
        }
      }
    });
  }    

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confirmPass = formGroup.controls[confirmPassword];

      if (confirmPass.errors && !confirmPass.errors['mustMatch']) {
        return;
      }

      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ mustMatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    };
  }

  switchTo(type: string) {
    this.switchPopup.emit(type);
  }

  closePopup() {
    this.close.emit();
  }
}
