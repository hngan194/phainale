import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLoggedIn: boolean = false;  // Biến kiểm tra trạng thái đăng nhập

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();  // Kiểm tra khi sidebar được hiển thị
  }

  // Kiểm tra trạng thái đăng nhập từ localStorage
  checkLoginStatus(): void {
    const token = localStorage.getItem('token'); // Kiểm tra token trong localStorage
    this.isLoggedIn = !!token; // Nếu có token thì người dùng đã đăng nhập
  }

  // Hàm kiểm tra quyền và điều hướng
  navigateTo(link: string): void {
    if (!this.isLoggedIn) {
      alert('Bạn cần đăng nhập trước khi truy cập vào chức năng này.');
      this.router.navigate(['/login']);  // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
      return;  // Dừng lại nếu chưa đăng nhập
    }

    // Điều hướng tới trang quản lý
    this.router.navigate([link]);
  }
}
