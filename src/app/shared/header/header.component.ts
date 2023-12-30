import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LearnerService } from 'src/app/Services/learner.service';
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
    public authService: AuthService,
    public learnerService: LearnerService
  ) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.learnerService.GetCartItemsByUserId(this.learnerService.userId);
  }
  Logout() {
    this.isLoggedIn = false;
    this.authService.Logout();
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
}
