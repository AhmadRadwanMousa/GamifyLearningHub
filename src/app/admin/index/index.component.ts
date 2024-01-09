import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(public adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.GetAdminReportDashboardDetails();
  }
}
