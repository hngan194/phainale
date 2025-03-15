import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';  // Import 'of' từ rxjs
import { catchError, map, retry } from 'rxjs/operators';

interface Product {
  _id: string;  // ID sản phẩm
  price: number;  // Giá sản phẩm
  description: string;  // Mô tả sản phẩm
  infor: string;  // Thông tin chi tiết sản phẩm
  amount: number;  // Số lượng sản phẩm
  categoryName: string;  // Danh mục sản phẩm
  name: string;  // Tên sản phẩm
  color: string;  // Màu sắc sản phẩm
  image: string;  // Hình ảnh sản phẩm (base64)
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) {}

  // Lấy tất cả sản phẩm theo categoryName
  getProductsByCategory(categoryName: string): Observable<Product[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const requestOptions: Object = { 
      headers: headers, 
      responseType: "json" 
    };

    // Truyền categoryName vào URL để lọc sản phẩm theo category
    return this._http.get<Product[]>(`/products?categoryName=${categoryName}`, requestOptions).pipe(  
      retry(3),
      catchError(this.handleError)
    );
  }

  // Lấy tất cả sản phẩm mà không theo category
  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const requestOptions: Object = { 
      headers: headers, 
      responseType: "json" 
    };

    return this._http.get<Product[]>('/products', requestOptions).pipe(  // Lấy tất cả sản phẩm từ API
      retry(3),
      catchError(this.handleError)  // Sử dụng handleError để xử lý lỗi
    );
  }
  // Hàm lấy danh mục với các sản phẩm

getCategoriesWithProducts(): any[] {
  const products = this.getAllProducts();  // Lấy tất cả sản phẩm từ API
  const categoriesWithProducts: any[] = [];  // Mảng chứa danh mục và các sản phẩm của nó

  // Tạo danh sách danh mục
  products.subscribe((allProducts: Product[]) => {
    const categories = Array.from(new Set(allProducts.map(product => product.categoryName)));  // Lấy tất cả danh mục không trùng lặp

    categories.forEach(category => {
      const productsInCategory = allProducts.filter(product => product.categoryName === category);
      categoriesWithProducts.push({ name: category, products: productsInCategory });
    });
  });

  return categoriesWithProducts;
}

  // Lấy sản phẩm theo ID
  getProductById(id: string) {
    return this._http.get<Product>(`http://localhost:3002/product/${id}`);
  }
  

  // Lấy tất cả các categoryName duy nhất từ các sản phẩm
  getCategories(): Observable<string[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const requestOptions: Object = { 
      headers: headers, 
      responseType: "json" 
    };

    return this._http.get<Product[]>('/products', requestOptions).pipe(  // Lấy tất cả sản phẩm từ API
      map(products => {
        // Trả về danh sách các categoryName duy nhất
        return Array.from(new Set(products.map(product => product.categoryName)));
      }),
      retry(3),
      catchError(this.handleError)  // Sử dụng handleError để xử lý lỗi
    );
  }

  // Xử lý lỗi và trả về một Observable với giá trị mặc định là một mảng trống
  private handleError(error: any): Observable<any> {
    console.error(error);
    return of([]);  // Trả về một Observable với giá trị là mảng trống
  }
}
