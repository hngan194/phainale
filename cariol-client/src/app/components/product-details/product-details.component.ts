import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product'; // Import model Product

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
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
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Lấy sản phẩm theo ID
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
         // Nếu sản phẩm có nhiều hình ảnh, lấy ảnh đầu tiên trong mảng làm ảnh được chọn
         if (product.image && product.image.length > 0) {
          this.selectedImage = product.image[0];
        } else {
          this.selectedImage = ''; // Nếu không có ảnh, gán giá trị mặc định
        }
  
        this.selectedColor = product.color || '';  // Cập nhật lại theo model mới
        this.saveToLocalStorage(id);  // Lưu vào localStorage
      }
    });
  }

  // Lưu sản phẩm đã xem vào localStorage
  private saveToLocalStorage(id: number): void {
    let viewedProducts: number[] = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
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
