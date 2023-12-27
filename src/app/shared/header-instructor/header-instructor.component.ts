import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header-instructor',
  templateUrl: './header-instructor.component.html',
  styleUrls: ['./header-instructor.component.scss'],
})
export class HeaderInstructorComponent {
  /**
   *
   */
  constructor(private authService: AuthService, private route: Router) {}
  Logout() {
    this.authService.Logout();
    this.route.navigate(['/Login']);
  }
}
