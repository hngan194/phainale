import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: string[] = [];  // Mảng chứa tên các category
  showCategories: boolean = false;  // Biến điều khiển hiển thị dropdown
  

  ngOnInit(): void {
    // Lấy danh sách các category khi khởi tạo component
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryClick(categoryName: string): void {
    // Xử lý khi người dùng click vào category, ví dụ: điều hướng đến trang sản phẩm
    console.log('Category clicked:', categoryName);
  }
  constructor(
    public popupService: PopupService,
    private productService: ProductService  // Thêm constructor cho ProductService
  ) {}

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