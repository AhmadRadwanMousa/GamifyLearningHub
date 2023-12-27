import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { getToken } from '../constants/token';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private authService: AuthService) {}
  canActivate(): boolean {
    if (this.authService.isLoggedIn() && !this.isTokenExpired()) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.route.navigate(['/Login']);
      return false;
    }
  }
  isTokenExpired(): boolean {
    const tokenPayload: any = getToken();
    if (tokenPayload) {
      const expiryTime = tokenPayload.exp * 1000;

      const currentTime = Date.now();
      return currentTime > expiryTime;
    }
    return true;
  }
}
