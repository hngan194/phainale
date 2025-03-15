import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiUrl = "http://localhost:3002/vouchers";

  constructor(private http: HttpClient) {}

  validateVoucher(code: string, totalPrice: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validate`, { code, totalPrice });
  }
  getDiscountByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${code}`);
  }
}