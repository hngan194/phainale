import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);  // Trạng thái đăng nhập
  private usernameSubject = new BehaviorSubject<string>(''); // Tên người dùng
  private roleSubject = new BehaviorSubject<string>(''); // Vai trò người dùng
  private lastNameSubject = new BehaviorSubject<string>(''); // Last name người dùng

  constructor() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const lastName = localStorage.getItem('last_name');  // Lấy last_name từ localStorage

    if (token) {
      this.isLoggedInSubject.next(true);
      this.usernameSubject.next(username || '');
      this.roleSubject.next(role || '');
      this.lastNameSubject.next(lastName || '');  // Cập nhật last_name nếu có
    }
  }

  // Getter cho trạng thái đăng nhập
  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  get username() {
    return this.usernameSubject.asObservable();
  }

  get role() {
    return this.roleSubject.asObservable();
  }

  get lastName() {
    return this.lastNameSubject.asObservable();  // Trả về last_name
  }

  // Đăng nhập
  login(token: string, role: string, username: string, last_name: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('last_name', last_name);  // Lưu last_name vào localStorage

    this.isLoggedInSubject.next(true);
    this.usernameSubject.next(username);
    this.roleSubject.next(role);
    this.lastNameSubject.next(last_name);  // Cập nhật last_name
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('last_name');  // Xóa last_name khỏi localStorage

    this.isLoggedInSubject.next(false);
    this.usernameSubject.next('');
    this.roleSubject.next('');
    this.lastNameSubject.next('');  // Xóa last_name
  } 
}
