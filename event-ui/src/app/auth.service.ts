import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5108/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string) {
    return this.http.post(`${this.api}/register`, { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string; role: string; username: string }>(
      `${this.api}/login`, { username, password }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
}
