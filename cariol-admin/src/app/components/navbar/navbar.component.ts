import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string = ''; // Lưu tên người dùng
  role: string = ''; // Lưu vai trò người dùng
  lastName: string = '';  // Lưu last_name của người dùng

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Lắng nghe thay đổi trạng thái đăng nhập từ AuthService
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;

      // Nếu chưa đăng nhập, chuyển hướng về trang login
      if (!status) {
        this.router.navigate(['/login']);
      }
    });

    // Lắng nghe thay đổi username và role từ AuthService
    this.authService.username.subscribe(username => {
      this.username = username;
    });

    this.authService.role.subscribe(role => {
      this.role = role;
    });

    // Lắng nghe thay đổi last_name từ AuthService
    this.authService.lastName.subscribe(lastName => {
      this.lastName = lastName;
    });
  }

  // Chuyển hướng đến trang đăng nhập
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Đăng xuất người dùng
  logout(): void {
    this.authService.logout();  // Gọi logout từ AuthService
    this.router.navigate(['/login']);
  }
}
