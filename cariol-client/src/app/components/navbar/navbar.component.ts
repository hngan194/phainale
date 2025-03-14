import { Component, OnInit, NgZone } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: string[] = [];
  showCategories: boolean = false; // Điều khiển dropdown sản phẩm

  isLoggedIn: boolean = false;
  username: string = '';
  menuVisible: boolean = false; // Điều khiển hiển thị menu xổ xuống

  constructor(
    public popupService: PopupService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone // ✅ Inject NgZone để force update UI
  ) {}

  ngOnInit(): void {
    // Lấy danh mục sản phẩm khi component được khởi tạo
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    // Kiểm tra trạng thái đăng nhập khi component khởi chạy
    this.checkLoginStatus();

    // Lắng nghe thay đổi trạng thái đăng nhập từ AuthService
    this.authService.isLoggedIn$.subscribe(status => {
      this.ngZone.run(() => { // ✅ Đảm bảo UI cập nhật khi giá trị thay đổi
        this.isLoggedIn = status;
        if (this.isLoggedIn) {
          this.username = this.authService.userValue?.last_name || '';
        }
      });
    });
  }

  checkLoginStatus() {
    const storedUser = localStorage.getItem('user');

    console.log("🔹 Kiểm tra dữ liệu user từ localStorage:", storedUser); // ✅ Debug dữ liệu

    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
        console.warn("⚠️ Không tìm thấy dữ liệu user hợp lệ!");
        this.isLoggedIn = false;
        this.username = '';
        return;
    }

    try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.last_name) {
            this.isLoggedIn = true;
            this.username = parsedUser.last_name;
            console.log("✅ Đăng nhập thành công, username:", this.username);
        } else {
            console.warn("⚠️ Dữ liệu user không hợp lệ:", parsedUser);
            this.isLoggedIn = false;
            this.username = '';
        }
    } catch (error) {
        console.error("❌ Lỗi parse JSON từ localStorage:", error);
        localStorage.removeItem('user'); // Xóa dữ liệu lỗi
        this.isLoggedIn = false;
        this.username = '';
    }
}



  // Toggle menu xổ xuống khi hover hoặc click vào icon
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Chuyển hướng đến trang profile
  goToProfile() {
    this.router.navigate(['/edit-profile']);
  }

  // Chuyển hướng đến trang thay đổi mật khẩu
  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  // ✅ Đăng xuất người dùng và cập nhật UI
  logout() {
    console.log("🔹 Đăng xuất người dùng...");
    localStorage.removeItem('token'); // Xóa token
    localStorage.removeItem('user'); // Xóa thông tin user

    this.ngZone.run(() => {
      this.isLoggedIn = false;
      this.username = '';
      this.menuVisible = false;
    });

    this.router.navigate(['/']);
  }

  // ✅ Xử lý sự kiện đăng nhập thành công từ login component
  onLoginSuccess() {
    console.log("🔹 Đăng nhập thành công, cập nhật trạng thái...");
    this.ngZone.run(() => {
      this.checkLoginStatus();
    });
  }

  onCategoryClick(categoryName: string): void {
    console.log('Category clicked:', categoryName);
  }

  get currentPopup() {
    return this.popupService.currentPopup;
  }

  isPopupOpen() {
    return this.popupService.isPopupOpen();
  }

  openPopup(type: string) {
    this.popupService.openPopup(type);
  }

  closePopup() {
    this.popupService.closePopup();
  }

  toggleCart() {
    if (this.popupService.isCartOpen()) {
      console.log('🔹 Đóng giỏ hàng');
      this.closePopup();
    } else {
      console.log('🔹 Mở giỏ hàng');
      this.openPopup('cart');
    }
  }
}




