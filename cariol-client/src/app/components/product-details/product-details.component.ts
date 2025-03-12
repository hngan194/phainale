import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';  // Import class Product

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;  // Sử dụng kiểu Product từ class
  selectedImage: string = ''; // Chuyển đổi image thành string
  selectedColor: string = '';
  quantity: number = 1;
  showDescription: boolean = false;
  showSize: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Lấy id từ paramMap, đảm bảo là string

    if (id) {
      // Lấy sản phẩm theo ID từ service
      this.productService.getProductById(id).subscribe(product => {
        if (product) {
          this.product = product;
          // Kiểm tra và gán ảnh sản phẩm (image là string)
          this.selectedImage = product.image || '';  // Nếu image là string, sử dụng trực tiếp
          
          this.selectedColor = product.color || '';  // Cập nhật lại theo model mới
          this.saveToLocalStorage(id);  // Lưu vào localStorage
        }
      });
    }
  }

  // Lưu sản phẩm đã xem vào localStorage
  private saveToLocalStorage(id: string): void {
    let viewedProducts: string[] = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
    if (!viewedProducts.includes(id)) {
      viewedProducts.push(id);
      localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }
  }

  // Chọn ảnh sản phẩm
  selectImage(image: string): void {
    this.selectedImage = image;
  }

  // Chọn màu sắc sản phẩm
  selectColor(color: string): void {
    this.selectedColor = color;
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(): void {
    this.quantity++;
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  // Mua ngay
  buyNow(): void {
    if (this.product) {
      this.router.navigate(['/order'], {
        queryParams: {
          id: this.product._id,  // Cập nhật _id thay vì id
          quantity: this.quantity,
          color: this.selectedColor || 'default'
        }
      });
    }
  }

  // Thêm vào giỏ hàng
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({ ...this.product, quantity: this.quantity });
    }
  }

  // Chuyển trạng thái hiển thị mô tả
  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  // Chuyển trạng thái hiển thị kích thước
  toggleSize(): void {
    this.showSize = !this.showSize;
  }
}
