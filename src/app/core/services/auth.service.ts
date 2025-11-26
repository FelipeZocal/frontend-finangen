import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credenciais, Token, Usuario } from '../models/usuario.model';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(creds: Credenciais): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, creds).pipe(
      tap(response => this.setToken(response.token))
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    // Opcional: decodificar para verificar a expiração
    // const decodedToken: any = jwtDecode(token);
    // const isExpired = decodedToken.exp * 1000 < Date.now();
    // return !isExpired;
    return true;
  }
}