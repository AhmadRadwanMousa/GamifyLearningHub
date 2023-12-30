import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/Services/auth.service';
import { RouteService } from 'src/app/Services/route-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  constructor(
    private routeService: RouteService,
    public route: Router,
    public authService: AuthService
  ) {
    let data = this.authService.isLoggedIn();
    if(data == true ){
      this.login = true;
    }
  }

  login = false;
  ngOnInit() {

  }

  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  classApplied2 = false;
  toggleClass2() {
    this.classApplied2 = !this.classApplied2;
  }

  classApplied3 = false;
  toggleClass3() {
    this.classApplied3 = !this.classApplied3;
  }
  get shouldHide(): boolean {
    return (
      this.routeService.currentRoute.startsWith('/admin') ||
      this.routeService.currentRoute.startsWith('/instructor') ||
      this.routeService.currentRoute.startsWith('/Login') ||
      this.routeService.currentRoute.startsWith('/Register')
    );
  }
  Logout() {
    this.authService.Logout();
    this.route.navigate(['/Login']);
  }
}
