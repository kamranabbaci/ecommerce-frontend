import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5125/api/Auth';

  private loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  saveUser(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('fullName', response.fullName);
    localStorage.setItem('email', response.email);
    localStorage.setItem('role', response.role);
    this.loginStatusSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.loginStatusSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  getFullName(): string {
    return localStorage.getItem('fullName') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
