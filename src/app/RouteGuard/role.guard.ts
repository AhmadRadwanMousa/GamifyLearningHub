import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { getToken } from '../constants/token';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public route: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token: any = getToken();
    const userRoleId: number | undefined = Number(token.roleId);
    const allowedRoleId: number = route.data['expectedRoleId'];
    console.log('routeRole', allowedRoleId);
    console.log('userRoleId', userRoleId);

    if (userRoleId === allowedRoleId) {
      return true;
    } else {
      this.route.navigate(['**']);
      return false;
    }
  }
}
