import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-courses',
  templateUrl: './home-page-courses.component.html',
  styleUrls: ['./home-page-courses.component.scss'],
})
export class HomeCoursesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // for tab click event
  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.currentTab = tab;
  }
}
