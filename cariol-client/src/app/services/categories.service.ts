import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Category } from '../models/category'; // Assuming you have a Category model
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl: string = 'http://localhost:3000/api';
  private category$: Observable<Category[]>;

  constructor(private httpClient: HttpClient) {
    this.category$ = this.httpClient.get<any>(`${this.apiUrl}/category`).pipe(
      map(response => response.datas),
      retry(2),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.category$;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(() => new Error(error.message));
  }

  getProductsByCategoryId(categoryId: string): Observable<Product[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/product?categoryId=${categoryId}`).pipe(
      map(response => response.data.docs),
      retry(2),
      catchError(this.handleError)
    );
  }
}
