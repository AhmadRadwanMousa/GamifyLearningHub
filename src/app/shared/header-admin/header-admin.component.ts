import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent {
  constructor(private authService: AuthService, private route: Router) {}
  Logout() {
    this.authService.Logout();
    this.route.navigate(['/Login']);
  }
}
