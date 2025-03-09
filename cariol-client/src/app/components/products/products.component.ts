import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Import service gọi API

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();  // Gọi hàm lấy tất cả sản phẩm khi component khởi tạo
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;  // Gán dữ liệu trả về vào mảng products
    });
  }
}
