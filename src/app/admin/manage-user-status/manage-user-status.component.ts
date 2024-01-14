import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-user-status',
  templateUrl: './manage-user-status.component.html',
  styleUrls: ['./manage-user-status.component.scss'],
})
export class ManageUserStatusComponent implements OnInit {
  constructor(public adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.GetUnAcceptedUsers();
  }
  HandleStatusChange(state: any, userId: any) {
    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('isAccepted', state);
    this.adminService.UpdatedUserStatus(formData);
  }
}
