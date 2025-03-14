import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3002/api/profile'; // Địa chỉ API backend của bạn

  constructor(private _http: HttpClient) {}

  // Lấy thông tin người dùng
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Thêm token vào header

    return this._http.get<any>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Lỗi khi lấy dữ liệu profile:', error); // Log lỗi khi gọi API
        return throwError(error);
      })
    );
  }

  // Cập nhật thông tin người dùng
  updateUserProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Thêm token vào header
  
    return this._http.put<any>(`${this.apiUrl}`, profileData, { headers }).pipe(
      catchError(error => {
        console.error('Lỗi khi cập nhật thông tin profile:', error); // Log lỗi khi gọi API
        return throwError(error);
      })
    );
  }
  
}
