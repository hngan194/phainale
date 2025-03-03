import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Blog } from '../../app/models/blog';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl: string = 'http://localhost:3000/api';
  private blog$: Observable<Blog[]>;

  constructor(private httpClient: HttpClient) {
    this.blog$ = this.httpClient.get<any>(`${this.apiUrl}/blog`).pipe(
      map(response => response.data),
      retry(2),
      catchError(this.handleError)
    );
  }
  
  getBlogs(): Observable<Blog[]> {
    return this.blog$;
  }

  getBlogDetails(id: string): Observable<Blog> {
    return this.blog$.pipe(
      map((products: Blog[]) => {
        const foundProduct = products.find(product => product._id === id);
        if (foundProduct) {
          return foundProduct;
        } else {
          throw new Error(`Blog with ID ${id} not found`);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

}