import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
    if (!this.userData) {
      alert("Không tìm thấy dữ liệu người dùng!");
      return;
    }

    // Create the form and set user data
    this.profileForm = this.fb.group({
      first_name: [this.userData.first_name || '', Validators.required],

      last_name: [this.userData.last_name || '', Validators.required],

      phone: [{ value: this.userData.phone || '', disabled: true} , [Validators.required, Validators.pattern("^[0-9]{10,11}$")]],

      email: [{ value: this.userData.email || '', disabled: true }, Validators.required],

      address: [this.userData.address || ''],

      city: [this.userData.city || ''],

      province: [this.userData.province || '']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage
      if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại!');
        return;
      }
  
      // Ensure Authorization header is correctly set with Bearer token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      // Send PUT request to update profile with token in header
      this.authService.updateUserProfile(this.profileForm.value, headers).subscribe({
        next: (response) => {
          alert("Cập nhật hồ sơ thành công!");
          this.router.navigate(['/homepage']);
        },
        error: (error) => {
          console.error("❌ Lỗi khi cập nhật hồ sơ:", error);
          alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
      });
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  }
  
  cancelEdit() {
    this.isEditing = false;
    this.profileForm.reset(this.userData);  // Reset form về dữ liệu ban đầu
  }

  enableEditing() {
    this.isEditing = true;
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }
}
