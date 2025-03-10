import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Blog } from '../models/blog'; // Tạo một model Blog tương tự như Product

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }

  // Hàm lấy tất cả blog
  getBlogs(): Observable<Blog[]> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };

    // Gửi yêu cầu lấy tất cả các blog
    return this._http.get<any>("/blogs", requestOptions).pipe(
      map(res => JSON.parse(res) as Blog[]), // Chuyển đổi dữ liệu về mảng Blog
      retry(3),
      catchError(this.handleError)
    );
  }

  // Hàm lấy blog theo ID
  getBlogById(id: any): Observable<Blog> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };

    // Gửi yêu cầu lấy blog theo ID
    return this._http.get<any>(`/blogs/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res) as Blog),
      retry(3),
      catchError(this.handleError)
    );
  }

  // Hàm xử lý lỗi
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
