import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/api/auth'; // Cập nhật API thật của Gentle Petals
  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    console.log('Gửi request đến API:', { email, password });

    return this._http.post<any>(`${this.url}/signin`, { email, password })
      .pipe(map(user => {
        console.log('API trả về:', user);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this._router.navigate(['/login']);
  }

  register(user: any) {
    return this._http.post(`${this.url}/signup`, user);
  }

  resetPassword(email: string) {
    return this._http.post(`${this.url}/forgot-password`, { email });
  }
}
