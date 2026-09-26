import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  
  // Using signals for reactive state
  currentUser = signal<User | null>(null);
  accessToken = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(tap(response => this.setAuth(response)));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.clearAuth()));
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(response => this.setAuth(response)),
        catchError(err => {
          this.clearAuth();
          return throwError(() => err);
        })
      );
  }

  checkSession() {
    this.http.get<AuthResponse>(`${this.apiUrl}/me`, { withCredentials: true })
      .pipe(catchError(() => {
        // Try to refresh token if /me fails
        return this.refreshToken();
      }))
      .subscribe({
        next: (res) => {
          if (res && res.roles) {
             this.setAuth(res);
          }
        },
        error: () => this.clearAuth()
      });
  }

  private setAuth(response: AuthResponse) {
    this.accessToken.set(response.accessToken);
    this.currentUser.set({
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.roles[0] // Simplify by taking first role
    });
  }

  private clearAuth() {
    this.accessToken.set(null);
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user ? user.role === role : false;
  }
}
