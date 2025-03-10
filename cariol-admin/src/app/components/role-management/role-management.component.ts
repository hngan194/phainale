import { Component } from '@angular/core';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent {
  users = [
    { fullName: 'Nguyễn Văn A', email: 'admin@example.com', role: 'admin' },
    { fullName: 'Trần Thị B', email: 'staff@example.com', role: 'staff' }
  ];

  newUser = { fullName: '', email: '', role: 'staff' };
  isConfirmOpen = false;
  adminPassword = '';
  readonly ADMIN_PASSWORD = 'admin123';

  openConfirmBox() {
    if (this.newUser.fullName && this.newUser.email) {
      this.isConfirmOpen = true;
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }

  closeConfirmBox() {
    this.isConfirmOpen = false;
  }

  confirmAddUser() {
    if (this.adminPassword === this.ADMIN_PASSWORD) {
      this.users.push({ ...this.newUser });
      this.newUser = { fullName: '', email: '', role: 'staff' };
      this.isConfirmOpen = false;
    } else {
      alert('Mật khẩu Admin không chính xác!');
    }
  }

  updateRole(index: number, newRole: string) {
    this.users[index].role = newRole;
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
