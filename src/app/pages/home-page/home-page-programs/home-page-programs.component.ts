import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-home-programs',
  templateUrl: './home-page-programs.component.html',
  styleUrls: ['./home-page-programs.component.scss'],
})
export class HomeCoursesComponent implements OnInit {
  constructor(public adminService: AdminService) {}
  programs: any;
  ngOnInit(): void {
    this.adminService.GetAllPrograms();
  }

  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.currentTab = tab;
  }
}
