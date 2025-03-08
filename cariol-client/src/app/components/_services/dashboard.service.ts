import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'https://your-api-endpoint.com'; // Thay bằng API thực tế của bạn

  constructor(private http: HttpClient) {}

  getProfilebyId(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  changeProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/update`, profileData);
  }
}
