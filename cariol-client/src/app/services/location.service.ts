import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://provinces.open-api.vn/api/?depth=3'; // URL API

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
