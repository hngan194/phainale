import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { catchError, map, Observable, retry, throwError } from 'rxjs'; 
import { Product } from '../models/product'; 

@Injectable({ 
  providedIn: 'root' 
}) 
export class ProductService { 

  constructor(private _http: HttpClient) { }   

  // Hàm lấy tất cả sản phẩm
  getProducts(): Observable<Product[]> { 
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8"); 
    const requestOptions: Object = { 
      headers: headers, 
      responseType: "text" 
    }; 
    return this._http.get<any>("/products", requestOptions).pipe( 
      map(res => JSON.parse(res) as Product[]), 
      retry(3), 
      catchError(this.handleError)
    ); 
  }

  // Hàm lấy sản phẩm theo categoryName
  getProductsByCategory(categoryName: string): Observable<Product[]> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8"); 
    const requestOptions: Object = { 
      headers: headers, 
      responseType: "text" 
    }; 

    // Gửi yêu cầu lấy sản phẩm theo categoryName
    return this._http.get<any>(`/products?categoryName=${categoryName}`, requestOptions).pipe( 
      map(res => JSON.parse(res) as Product[]), 
      retry(3), 
      catchError(this.handleError)
    );
  }
 // Hàm lấy sản phẩm theo ID
 getProductById(id: any): Observable<Product> {
  const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
  const requestOptions: Object = {
    headers: headers,
    responseType: "text"
  };

  // Gửi yêu cầu lấy sản phẩm theo ID
  return this._http.get<any>(`/products/${id}`, requestOptions).pipe(
    map(res => JSON.parse(res) as Product),
    retry(3),
    catchError(this.handleError)
  );
}
// Hàm lấy danh mục với các sản phẩm
getCategoriesWithProducts(): any[] {
  const products = this.getProducts();  // Lấy tất cả sản phẩm từ API
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
  // Xử lý lỗi
  handleError(error: HttpErrorResponse) { 
    return throwError(() => new Error(error.message)); 
  }
}
