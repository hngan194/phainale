import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';  // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentRoute = route.routeConfig?.path;  // Lấy route hiện tại

    // Bỏ qua kiểm tra nếu đang ở trang login hoặc logout
    if (currentRoute === 'login' || currentRoute === 'logout') {
      return true;  // Cho phép truy cập vào các route này mà không cần kiểm tra đăng nhập
    }

    // Kiểm tra trạng thái đăng nhập
    return new Observable<boolean>(observer => {
      this.authService.isLoggedIn.subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          // Nếu chưa đăng nhập, hiển thị thông báo lỗi và chuyển hướng tới trang login
          alert('Bạn cần đăng nhập trước khi truy cập vào chức năng này!');
          this.router.navigate(['/login']);  // Điều hướng về trang login
          observer.next(false); // Ngừng tiếp tục và không cho phép truy cập
          observer.complete();
        } else {
          observer.next(true); // Cho phép truy cập nếu đã đăng nhập
          observer.complete();
        }
      });
    });
  }
}

