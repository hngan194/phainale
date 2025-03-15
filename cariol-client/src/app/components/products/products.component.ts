import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import ActivatedRoute
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
  searchQuery: string = ''; // Thêm biến để lưu từ khóa tìm kiếm
  filteredProducts: Product[] = []; // Mảng chứa sản phẩm sau khi lọc
  sortOption: string = 'default';

  constructor(
    private activatedRoute: ActivatedRoute,  // Khai báo ActivatedRoute trong constructor
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy categoryName từ queryParams trong URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryName = params['categoryName'] || '';  // Nếu không có categoryName, để trống
      this.fetchProducts();
    });
  }

  // Lấy tất cả sản phẩm
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;  // Cập nhật danh sách sản phẩm
      this.applyFilters(); // Lọc sản phẩm theo từ khóa tìm kiếm và category
    });
  }

  // Hàm lọc sản phẩm theo từ khóa tìm kiếm và category
  applyFilters(): void {
    let filtered = [...this.products];
    
    // Lọc theo category nếu có
    if (this.categoryName) {
      filtered = filtered.filter(product => product.categoryName === this.categoryName);  // Không dùng toLowerCase()
    }
  
    // Lọc theo từ khóa tìm kiếm nếu có
    if (this.searchQuery.trim()) {
      const lowerQuery = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowerQuery)
      );
    }
  
    this.filteredProducts = filtered;
    this.sortProducts();
  }  

  // Hàm để cập nhật tùy chọn sắp xếp
  updateSortOption(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;
    this.sortProducts();
  }

  // Hàm sắp xếp sản phẩm theo các tùy chọn
  sortProducts() {
    switch (this.sortOption) {
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
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
