import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Thêm router để điều hướng

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  users: any[] = []; // Danh sách user từ database
  newUser = { email: '', last_name: '', role: 'staff' }; // Thông tin user mới
  adminPassword = ''; // Mật khẩu admin
  isAddUserPopupOpen = false;
  isConfirmPopupOpen = false;
  selectedUserId: string = '';
  apiUrl = 'http://localhost:3002/auth'; // URL API

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkIfAdmin(); // Kiểm tra quyền admin khi component được khởi tạo
    this.loadUsers(); // Tải danh sách user từ database khi component khởi tạo
  }

  // Kiểm tra xem người dùng có vai trò admin hay không
  checkIfAdmin(): void {
    const role = localStorage.getItem('role'); // Lấy role từ localStorage
    if (role !== 'admin') {
      alert('Bạn không có quyền truy cập vào trang này.');
      this.router.navigate(['/dashboard']);
    }
  }

  // Mở popup thêm tài khoản
  openAddUserPopup() {
    this.isAddUserPopupOpen = true;
  }

  closeAddUserPopup() {
    console.log("Đóng popup thêm người dùng");
    this.isAddUserPopupOpen = false;
    this.newUser = { email: '', last_name: '', role: 'staff' };
  }

  // Kiểm tra user có tồn tại không
  checkUserExists() {
    this.http.post(`${this.apiUrl}/check-user`, {
      email: this.newUser.email,
      phone: ""
    }).subscribe(
      (res: any) => {
        if (res.exists) {
          this.selectedUserId = res.userId;
          this.isAddUserPopupOpen = false;
          this.isConfirmPopupOpen = true;
        } else {
          alert("User không tồn tại!");
        }
      },
      (error) => {
        console.error("Lỗi kiểm tra user:", error);
        alert("Lỗi kiểm tra tài khoản!");
      }
    );
  }

  confirmAddUser() {
    const FIXED_PASSWORD = "admin123"; // Mật khẩu cố định bạn muốn sử dụng

    if (this.adminPassword === FIXED_PASSWORD) {
      // Nếu mật khẩu đúng, tự động cập nhật role
      this.updateUserRole();
      this.closeAddUserPopup();
    } else {
      alert("Mật khẩu không chính xác!");  // Hiển thị thông báo nếu mật khẩu sai
    }
  }

  // Cập nhật role của user
  updateUserRole() {
    this.http.put(`${this.apiUrl}/update-role`, {
      email: this.newUser.email,
      newRole: this.newUser.role
    }).subscribe(
      (res: any) => {
        alert(res.message);  // Thông báo khi cập nhật thành công
        this.loadUsers();  // Reload danh sách user sau khi cập nhật
        this.closeAddUserPopup();
      },
      (error) => {
        console.error("Lỗi cập nhật vai trò:", error);
        alert('Lỗi cập nhật vai trò!');
      }
    );
  }

  // Xóa role (trở về client)
  deleteUser(index: number) {
    const userEmail = this.users[index].email;  // Lấy email của user cần cập nhật

    // Gửi PUT request tới backend để cập nhật role thành "client"
    this.http.put(`${this.apiUrl}/update-role`, {
      email: userEmail,  // Lấy email của người dùng cần cập nhật
      newRole: 'client'  // Cập nhật role thành "client"
    }).subscribe(
      (res: any) => {
        alert(res.message);  // Hiển thị thông báo thành công
        this.loadUsers();  // Reload danh sách user sau khi cập nhật
      },
      (error) => {
        console.error("Lỗi khi cập nhật vai trò:", error);
        alert('Lỗi khi cập nhật vai trò!');
      }
    );
  }

  closeConfirmPopup() {
    console.log("Đóng popup xác nhận");
    this.isConfirmPopupOpen = false;
    this.adminPassword = '';
  }

  // Load danh sách user từ database (chỉ lấy user có role admin hoặc staff)
  loadUsers() {
    this.http.get(`${this.apiUrl}/users/list`).subscribe(
      (res: any) => {
        if (res.users && res.users.length > 0) {
          this.users = res.users;
        } else {
          console.warn("Không có user nào thỏa điều kiện.");
          this.users = [];
        }
      },
      (error) => {
        console.error("Lỗi tải danh sách user:", error);
        alert("Lỗi tải danh sách user!");
      }
    );
  }
}
