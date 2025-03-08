import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

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

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
//   categories = [
//   
// ];

//   constructor(private productService: ProductService) {}

