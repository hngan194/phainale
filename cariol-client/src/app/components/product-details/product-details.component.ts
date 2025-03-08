import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[]; // Thêm danh sách ảnh (nếu có)
  colors: string[];
  description?: string; // Thêm mô tả
  size?: string; // Thêm kích thước
}

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  selectedImage: string='';
  selectedColor: string='';
  quantity: number = 1;
  showDescription: boolean = false;
  showSize: boolean = false;


  constructor(    
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router) {}

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
  
      this.productService.getProductById(id).subscribe(product => {
        if (product) {
          this.product = product;
          this.selectedImage = product.image;
          this.selectedColor = product.colors?.[0] || '';
  
          const category = this.findCategoryByProductId(id);
          if (category) {
            this.loadRelatedProducts(id, category);
          }
  
          this.saveToLocalStorage(id);
        }
      });
    }
  
    private findCategoryByProductId(id: number): string | null {
      const categoryObj = this.productService.getCategoriesWithProducts()
        .find(cat => cat.products.some(p => p.id === id));
  
      return categoryObj ? categoryObj.name : null;
    }
  
    private loadRelatedProducts(id: number, category: string) {
      const allProducts = this.productService.getProducts();
      this.relatedProducts = allProducts
        .filter((p: Product) => this.findCategoryByProductId(p.id) === category && p.id !== id)
        .slice(0, 4);
    }
  
    private saveToLocalStorage(id: number) {
      let viewedProducts: number[] = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
      if (!viewedProducts.includes(id)) {
        viewedProducts.push(id);
        localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
      }
    }

    selectImage(image: string) {
      this.selectedImage = image;
    }
  
    selectColor(color: string) {
      this.selectedColor = color;
    }
  
    increaseQuantity() {
      this.quantity++;
    }
  
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    }
  
    buyNow() {
      if (this.product) {
        this.router.navigate(['/order'], { 
          queryParams: { 
            id: this.product.id, 
            quantity: this.quantity,
            color: this.selectedColor || 'default' 
          } 
        });
      }
    }
  
    addToCart() {
      this.cartService.addToCart({ ...this.product, quantity: this.quantity });
    }
  
    toggleDescription() {
      this.showDescription = !this.showDescription;
    }
  
    toggleSize() {
      this.showSize = !this.showSize;
    }
  }