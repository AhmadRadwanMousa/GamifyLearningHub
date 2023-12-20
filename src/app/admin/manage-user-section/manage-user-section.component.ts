import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-user-section',
  templateUrl: './manage-user-section.component.html',
  styleUrls: ['./manage-user-section.component.scss']
})
export class ManageUserSectionComponent {
  @ViewChild('OpenAddDialog') OpenAddDialog: any;
  constructor(public admin: AdminService, public dialog: MatDialog) {}
  selectedCourse: any;
  selectedUser: any;
  ngOnInit(){
    this.admin.getAllCourses();
  }
  AddUserSectionForm : FormGroup = new FormGroup({
    userid: new FormControl('', Validators.required),
    sectionid: new FormControl('', Validators.required),
  }
  );
  loadSection(id: number){
    this.admin.getSectionByCourseId(id);
    console.log(this.admin.sections);
    
  }

  AddDialog(id: number){
    this.admin.getAllStudents();
    this.AddUserSectionForm.controls['sectionid'].setValue(id);
    console.log(this.admin.students);
    
    this.dialog.open(this.OpenAddDialog, {
      width: '600px',
      height: '350px',
    });
  }
  

  CreateUserSection(){
    console.log(this.AddUserSectionForm.value);
    
    this.admin.createUserSection(this.AddUserSectionForm.value);
  }
}
