import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3002/auth'; // ✅ Cổng của backend

  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;

  private loggedInSubject: BehaviorSubject<boolean>;  // Trạng thái đăng nhập
  public isLoggedIn$: Observable<boolean>;  // Observable cho trạng thái đăng nhập

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {
    // 🛠️ Fix lỗi JSON.parse(undefined) bằng try-catch
    let user = null;
    try {
      const storedUser = localStorage.getItem('user');
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("❌ Lỗi parse JSON từ localStorage:", error);
      localStorage.removeItem('user'); // Xóa dữ liệu lỗi
    }

    this.userSubject = new BehaviorSubject(user);
    this.user = this.userSubject.asObservable();

    // Quản lý trạng thái đăng nhập
    this.loggedInSubject = new BehaviorSubject(!!user);
    this.isLoggedIn$ = this.loggedInSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // 🟢 Đăng nhập
  login(phone: string, password: string) {
    console.log('🔹 Gửi request đăng nhập:', { phone, password });

    return this._http.post<any>(`${this.url}/login`, { phone, password })
      .pipe(map(user => {
        console.log('✅ API trả về:', user);

        // 🛠️ Fix lỗi nếu user trả về null
        if (!user) {
          throw new Error("Dữ liệu user từ API không hợp lệ!");
        }

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user); // Cập nhật thông tin người dùng trong BehaviorSubject

        // Cập nhật trạng thái đăng nhập
        this.loggedInSubject.next(true);  

        return user;
      }));
  }

  // 🟢 Đăng xuất
  logout() {
    console.log("🔹 Đang đăng xuất...");

    // Xóa thông tin người dùng trong localStorage
    localStorage.removeItem('user');

    // Cập nhật trạng thái đăng nhập
    this.userSubject.next(null);
    this.loggedInSubject.next(false);

    console.log("✅ Đăng xuất thành công, chuyển hướng về trang chủ.");
    this._router.navigate(['/homepage']);
  }

  // 🟢 Kiểm tra tài khoản trước khi đăng ký
  checkUserExists(phone: string, email: string) {
    console.log('🔹 Kiểm tra tài khoản tồn tại với:', { phone, email });

    return this._http.post<any>(`${this.url}/check-user`, {
      phone: phone.trim(),
      email: email.trim().toLowerCase()
    });
  }

  // 🟢 Đăng ký tài khoản
  register(user: any) {
    console.log("🔹 Gửi request đăng ký:", user);
    return this._http.post(`${this.url}/register`, user);
  }

  // 🟢 Quên mật khẩu
  forgotPassword(email: string) {
    console.log("🔹 Gửi request quên mật khẩu:", email);
    return this._http.post(`${this.url}/forgot-password`, { email });
  }
 
  



  getUserData() {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("❌ Lỗi parse JSON từ localStorage:", error);
      localStorage.removeItem('user');
      return null;
    }
  }
  
  // updateUserProfile(userData: any): Observable<any> {
  //   return this._http.put<any>(`${this.url}/update-profile`, userData).pipe(
  //     map((response: any) => {
  //       console.log("✅ API trả về:", response);
  //       localStorage.setItem('user', JSON.stringify(response));
  //       this.userSubject.next(response);
  //       return response;
  //     })
  //   );
  // }
  

  updateUserProfile(userData: any, headers: HttpHeaders): Observable<any> {
    return this._http.put<any>(`${this.url}/update-profile`, userData, { headers })  // Pass headers with the request
        .pipe(
            map((response: any) => {
                console.log("✅ API trả về:", response);
                localStorage.setItem('user', JSON.stringify(response));  // Cập nhật thông tin người dùng
                return response;
            })
        );
}

changePassword(oldPassword: string, newPassword: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this._http.put<any>(`${this.url}/change-password`, { oldPassword, newPassword }, { headers })
    .pipe(
      map((response: any) => {
        console.log("✅ Đổi mật khẩu thành công:", response);
        return response;
      })
    );
}




}
