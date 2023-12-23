import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
