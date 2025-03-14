import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Khởi tạo form với các trường thông tin cần thiết
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
    });
  }

  // Validator để đảm bảo mật khẩu mới và xác nhận mật khẩu phải khớp
  passwordMatchValidator(control: any): { [key: string]: boolean } | null {
    if (control?.parent?.get('newPassword')?.value !== control?.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  // Hàm xử lý khi người dùng gửi form
  // onSubmit() {
  //   if (this.changePasswordForm.valid) {
  //     const { oldPassword, newPassword } = this.changePasswordForm.value;
      
  //     // Kiểm tra sự tồn tại của token
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       alert("Token không hợp lệ hoặc không tồn tại!");
  //       return;
  //     }
  
  //     // Gửi yêu cầu đổi mật khẩu với token trong header
  //     this.authService.changePassword(oldPassword, newPassword).subscribe({
  //       next: (response) => {
  //         alert("Mật khẩu đã được thay đổi thành công!");
  //         this.router.navigate(['/homepage']);
  //       },
  //       error: (error) => {
  //         console.error("❌ Lỗi khi thay đổi mật khẩu:", error);
  //         alert("Có lỗi xảy ra khi thay đổi mật khẩu, vui lòng thử lại!");
  //       }
  //     });
  //   } else {
  //     alert("Vui lòng điền đầy đủ và đúng thông tin!");
  //   }
  // }
  

  // onSubmit() {
  //   if (this.changePasswordForm.valid) {
  //     const { oldPassword, newPassword, confirmPassword  } = this.changePasswordForm.value;
      

  //   // Kiểm tra mật khẩu mới và mật khẩu xác nhận có giống nhau không
  //   if (newPassword !== confirmPassword) {
  //     alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
  //     return;
  //   }

  //     // Kiểm tra sự tồn tại của token
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       alert('Token không hợp lệ hoặc không tồn tại!');
  //       return;
  //     }
  
  //     // Gửi yêu cầu đổi mật khẩu với token trong header
  //     this.authService.changePassword(oldPassword, newPassword).subscribe({
  //       next: (response) => {
  //         alert("Mật khẩu đã được thay đổi thành công!");
  //         this.router.navigate(['/profile']);
  //       },
  //       error: (error) => {
  //         // Kiểm tra lỗi từ backend
  //         console.error("❌ Lỗi khi thay đổi mật khẩu:", error);
  //         if (error.status === 400) {
  //           // Hiển thị lỗi nếu mật khẩu cũ không đúng
  //           alert(error.error.message || "Có lỗi xảy ra khi thay đổi mật khẩu, vui lòng thử lại!");
  //         } else {
  //           alert("Có lỗi xảy ra khi thay đổi mật khẩu, vui lòng thử lại!");
  //         }
  //       }
  //     });
  //   } else {
  //     alert("Vui lòng điền đầy đủ và đúng thông tin!");
  //   }
  // }
  
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      
      // Kiểm tra mật khẩu mới và mật khẩu xác nhận có giống nhau không
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại!');
        return;
      }
  
      // Gửi yêu cầu đổi mật khẩu
      this.authService.changePassword(oldPassword, newPassword).subscribe({
        next: (response) => {
          alert("Mật khẩu đã được thay đổi thành công!");
          this.router.navigate(['/homepage']);
        },
        error: (error) => {
          console.error("❌ Lỗi khi thay đổi mật khẩu:", error);
          alert("Mật khẩu cũ không chính xác");
        }
      });
    } else {
      alert("Vui lòng điền đầy đủ và đúng thông tin!");
    }
  }
  

  // Hàm quay lại trang hồ sơ
  goBack() {
    this.router.navigate(['/homepage']);
  }
}
