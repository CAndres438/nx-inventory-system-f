import { Injectable, computed, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth-token';

  private userSignal = signal<any | null>(this.decodeToken());

  public readonly user = computed(() => this.userSignal());

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.updateUserFromToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userSignal.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }


  updateUserFromToken(): void {
    this.userSignal.set(this.decodeToken());
  }

  hasRole(requiredRole: string): boolean {
    const decoded = this.userSignal();
    if (!decoded || !decoded.role) return false;
    return decoded.role === requiredRole;
  }

  logout(): void {
    this.removeToken();
  }
}
