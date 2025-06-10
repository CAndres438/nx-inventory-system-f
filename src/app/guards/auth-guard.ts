import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenService.getToken();

    if (!token || !this.tokenService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];

    if (requiredRole && !this.tokenService.hasRole(requiredRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
