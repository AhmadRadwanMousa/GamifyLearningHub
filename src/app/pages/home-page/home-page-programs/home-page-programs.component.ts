import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-home-programs',
  templateUrl: './home-page-programs.component.html',
  styleUrls: ['./home-page-programs.component.scss'],
})
export class HomePagePrograms implements OnInit {
  constructor(
    public adminService: AdminService,
    public sharedService: SharedService
  ) {}
  programs: any;
  ngOnInit(): void {
    this.adminService.GetAllPrograms();
    this.sharedService.GetAllPlansWithPrograms();
  }

  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.currentTab = tab;
  }
}
