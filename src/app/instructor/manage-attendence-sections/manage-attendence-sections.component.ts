import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-manage-attendence-sections',
  templateUrl: './manage-attendence-sections.component.html',
  styleUrls: ['./manage-attendence-sections.component.scss']
})
export class ManageAttendenceSectionsComponent {
  constructor(public shard: InstructorService, public dialog: MatDialog,private route: Router) {}


  ngOnInit(){
    this.shard.getAllInstructorSections();
  }


  GoToUsers(id:number){

    this.route.navigate(['pages/instructorDetails',id])
  }

}
