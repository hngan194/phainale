import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
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
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', id);  // Kiểm tra id
  
    if (id) {
      this.productService.getProductById(id).subscribe(
        (product) => {
          console.log('Product from API:', product); // Kiểm tra sản phẩm từ API
          this.product = product;
          this.quantity = product.amount > 0 ? 1 : 0;
        },
        (error) => {
          console.error('Error loading product:', error);
        }
      );
    }
  }
  

  private saveToLocalStorage(id: string): void {
    let viewedProducts: string[] = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
    if (!viewedProducts.includes(id)) {
      viewedProducts.push(id);
      localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.amount) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  getFormattedPrice(): string {
    // Kiểm tra nếu product và price không undefined hoặc null
    if (this.product && this.product.price) {
      return this.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return '0 VND'; // Nếu không có giá trị, trả về giá trị mặc định
  }  
  
  buyNow(): void {
    if (this.product && this.product.amount > 0) {
      this.router.navigate(['/order'], {
        queryParams: {
          id: this.product._id,
          quantity: this.quantity,
          color: this.product.color
        }
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({ ...this.product, quantity: this.quantity });
    }
  }

  isSpecsOpen = false;
  toggleSpecs() {
    this.isSpecsOpen = !this.isSpecsOpen;
  }
}