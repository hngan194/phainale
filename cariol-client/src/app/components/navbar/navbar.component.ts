import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { ProductService } from '../../services/product.service';  // Thêm import ProductService

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Các biến và thuộc tính mới cho category dropdown
  showCategories: boolean = false;
  categories = [
    { name: 'Balo' },
    { name: 'Ví' },
    { name: 'Túi Tote' },
    { name: 'Phụ kiện' }
  ];

  selectedCategory: string | null = null;  // Thêm thuộc tính để theo dõi category người dùng chọn

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

  // Hàm xử lý khi click vào một category
  onCategoryClick(category: any) {
    this.selectedCategory = category.name;  // Cập nhật category người dùng chọn
    this.getProductsForCategory();
  }

  // Hàm lấy sản phẩm theo category hoặc tất cả sản phẩm
  getProductsForCategory() {
    if (this.selectedCategory) {
      // Nếu có category, gọi API để lấy sản phẩm theo category
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(products => {
        console.log('Sản phẩm theo category:', products);
        // Xử lý hiển thị sản phẩm theo category
      });
    } else {
      // Nếu không có category (tức là bấm vào "Sản phẩm"), gọi API để lấy tất cả sản phẩm
      this.productService.getProducts().subscribe(products => {
        console.log('Tất cả sản phẩm:', products);
        // Xử lý hiển thị tất cả sản phẩm
      });
    }
  }

  // Hàm để reset khi bấm vào "Sản phẩm"
  onAllProductsClick() {
    this.selectedCategory = null;  // Reset category
    this.getProductsForCategory();  // Lấy tất cả sản phẩm
  }
}
