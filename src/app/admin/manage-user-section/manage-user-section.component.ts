import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-manage-user-section',
  templateUrl: './manage-user-section.component.html',
  styleUrls: ['./manage-user-section.component.scss']
})

export class ManageUserSectionComponent {
  @ViewChild('OpenAddDialog') OpenAddDialog: any;

  formGroup: FormGroup = new FormGroup({});
  constructor(public admin: AdminService, public dialog: MatDialog, public fb: FormBuilder) {
    
  }
  selectedCourse: any;
  selectedUser: any;

  ngOnInit() {
    this.admin.getAllCourses();
    this.initForm();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'userid' : ['', Validators.required],
      'sectionid' : ['', Validators.required]
    });
    this.formGroup.get('userid')?.valueChanges.subscribe(
      res => {
        this.filterData(res);
      }
    );
  }

  filterData(data: any) {
    this.admin.filterdStudents = this.admin.students.filter((item: any) => {
      const itemName = item.firsname || '';
      return itemName.toLowerCase().includes(data.toLowerCase());
    });
  }
  

  
  loadSection(id: number) {
    this.admin.getSectionByCourseId(id);
  }

  AddDialog(id: number) {
    this.admin.getAllStudents();
    this.formGroup.controls['sectionid'].setValue(id);
    this.dialog.open(this.OpenAddDialog, {
      width: '500px',
      height: '300px',
    });
  }


  CreateUserSection() {
    this.admin.createUserSection(this.formGroup.value);
  }
  
}
