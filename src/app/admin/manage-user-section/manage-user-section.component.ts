import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-user-section',
  templateUrl: './manage-user-section.component.html',
  styleUrls: ['./manage-user-section.component.scss']
})
export class ManageUserSectionComponent {
  constructor(public admin: AdminService) {}
  
}
