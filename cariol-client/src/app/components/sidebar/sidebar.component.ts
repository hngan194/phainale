import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule để sử dụng ngModel

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Import FormsModule vào đây
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false; // Mặc định là chưa đăng nhập

  profile = {  
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: ''
  };

  ngOnInit() {
    // Kiểm tra token đăng nhập từ localStorage
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout() {
    console.log("User logged out!");
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
    this.isLoggedIn = false; // Cập nhật trạng thái
  }

  onSubmit() {
    if (!this.profile.firstName || !this.profile.lastName || !this.profile.phoneNumber) {
      console.warn("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    console.log("Form submitted:", this.profile);
  }
}
