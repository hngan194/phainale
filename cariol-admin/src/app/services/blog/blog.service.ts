// src/app/services/blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:3002/blogs';  // Đảm bảo cổng đúng là 3002

  constructor(private http: HttpClient) { }

  // Hàm để lấy danh sách blog từ server
  getBlogs(): Observable<any> {
    console.log('Đang gọi API:', this.apiUrl);  // Log URL gọi API
    return this.http.get(this.apiUrl);  // Gọi API server MongoDB
  }
  // Hàm để lấy thông tin chi tiết của một blog
  getBlogById(blogId: string): Observable<any> {
    return this.http.get(`http://localhost:3002/blogs/${blogId}`).pipe(
      catchError(error => {
        console.error('Error fetching blog:', error);
        return throwError(error);  // Propagate error so that component can handle it
      })
    );
  }

  // Thêm một blog mới
  addBlog(blog: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blog);
  }

  updateBlog(blogId: string, blogData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${blogId}`, blogData);
    // console.log(`Updating blog with ID: ${blogId}`);  // Log ID để kiểm tra
  
    // // Cấu hình headers nếu cần thiết (thông thường không cần thiết với FormData)
    // const headers = new HttpHeaders();  
  
    // // Gửi yêu cầu PUT đến backend
    // return this.http.put<any>(`${this.apiUrl}/${blogId}`, blogData, { headers });
  }


  // Xóa một blog theo id
  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
