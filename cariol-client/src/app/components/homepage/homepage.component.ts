import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  categories: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.categories = this.productService.getCategoriesWithProducts();
  }

  viewCategory(categoryName: string) {
    this.router.navigate(['/category', categoryName]);
  }


  viewProduct(productId: string | undefined) {
    console.log('Product ID:', productId); // Kiểm tra dữ liệu
  
    if (!productId) {
      console.error('Error: productId is undefined!');
      return;
    }
  
    this.router.navigate(['/products', productId]);
  }
  

  navigateToProduct(productId: string) {
    this.router.navigate(['/products', productId]);
  }
}
//   categories = [
//   
// ];

//   constructor(private productService: ProductService) {}

