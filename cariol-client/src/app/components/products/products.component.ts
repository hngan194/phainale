import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categoryName: string = '';  // Lưu trữ categoryName từ queryParams
  products: Product[] = [];  // Lưu trữ danh sách sản phẩm

  constructor(
    private activatedRoute: ActivatedRoute,  // Khai báo ActivatedRoute trong constructor
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Lấy categoryName từ queryParams trong URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryName = params['categoryName'] || '';  // Nếu không có categoryName, để trống
      if (this.categoryName) {
        // Lọc sản phẩm theo categoryName
        this.getProductsByCategory(this.categoryName);
      } else {
        // Nếu không có categoryName, lấy tất cả sản phẩm
        this.getAllProducts();
      }
    });
  }

  // Lấy tất cả sản phẩm
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;  // Cập nhật danh sách sản phẩm
    });
  }

  // Lấy sản phẩm theo categoryName
  getProductsByCategory(categoryName: string): void {
    this.productService.getProductsByCategory(categoryName).subscribe((products: Product[]) => {
      this.products = products;  // Cập nhật danh sách sản phẩm theo category
    });
  }
}
