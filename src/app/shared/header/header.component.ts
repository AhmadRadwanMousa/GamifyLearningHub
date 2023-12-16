import { Component, OnInit, HostListener } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

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
}
