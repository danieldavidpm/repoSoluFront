import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly TOKEN_KEY     = 'saigna_token';
  private readonly CONTAINER_KEY = 'saigna_blob_container';
  private readonly API_BASE = environment.apiUrl;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_BASE}/Auth/login`, credentials)
      .pipe(tap(response => this.saveToken(response)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CONTAINER_KEY);
    this.router.navigate(['/saigna/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getContainer(): string {
    return localStorage.getItem(this.CONTAINER_KEY) ?? '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private saveToken(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.CONTAINER_KEY, response.containerDeAdjuntos);
  }
}
