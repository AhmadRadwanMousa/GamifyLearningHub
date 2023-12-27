import { Token } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { InstructorService } from 'src/app/Services/instructor.service';
import { getToken } from 'src/app/constants/token';

@Component({
  selector: 'app-manage-assignments',
  templateUrl: './manage-assignments.component.html',
  styleUrls: ['./manage-assignments.component.scss'],
})
export class ManageAssignmentsComponent implements OnInit {
  constructor(
    public instructorService: InstructorService,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {}
  @ViewChild('CreateDialog') CreateAssignmentDialog: any;
  @ViewChild('DeleteDialog') DeleteAssignmentDialog: any;
  @ViewChild('UpdateDialog') UpdateAssignmentDialog: any;

  token: any = getToken();
  showAssignments: boolean = false;
  filename: string = '';
  filePath: string = '';
  sectionid: number = 0;
  assignmentDetails = new FormGroup({
    assignmentname: new FormControl('', [Validators.required]),
    assignmentmark: new FormControl(0, [Validators.required]),
    assignmentdate: new FormControl('', [Validators.required]),
    assignmenttime: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.instructorService.GetSectionsByInstructorId(Number(this.token.userId));
  }

  ShowAssignments() {
    this.instructorService.GetAssignmentsBySectionId(this.sectionid);
    this.showAssignments = true;
  }
  OpenCreateAssignmentDialog() {
    let createDialog = this.dialog.open(this.CreateAssignmentDialog, {
      width: '500px',
      height: '500px',
    });
    createDialog.afterClosed().subscribe((result) => {
      if (result) {
        let deadline = this.mergeDateTime();
        let newAssignment: any = {
          assignmentname: this.assignmentDetails.get('assignmentname')?.value,
          assignmentmark: this.assignmentDetails.get('assignmentmark')?.value,
          assignmentdeadline: deadline,
          assignmentdescription: this.filePath,
          sectionid: this.sectionid,
        };
        this.instructorService.CreateAssignment(newAssignment);
        this.assignmentDetails.reset();
      }
    });
  }
  OpenDeleteAssignmentDialog(assignmentId: number) {
    let deleteDialog = this.dialog.open(this.DeleteAssignmentDialog);
    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.instructorService.DeleteAssignment(assignmentId, this.sectionid);
      }
    });
  }
  OpenUpdateAssignmentDialog(assignment: any) {
    let updateDialog = this.dialog.open(this.UpdateAssignmentDialog, {
      width: '500px',
      height: '500px',
    });
    this.assignmentDetails.patchValue({
      assignmentname: assignment.assignmentname,
      assignmentmark: assignment.assignmentmark,
      assignmentdate: assignment.assignmentdeadline,
    });
    updateDialog.afterClosed().subscribe((result) => {
      if (result) {
        let deadline = this.mergeDateTime();
        let updatedAssignment: any = {
          assignmentname: this.assignmentDetails.get('assignmentname')?.value,
          assignmentmark: this.assignmentDetails.get('assignmentmark')?.value,
          assignmentdeadline: deadline,
          assignmentdescription: this.filePath,
          sectionid: this.sectionid,
          assignmentid: assignment.assignmentid,
        };
        this.instructorService.UpdateAssignment(updatedAssignment);
      }
      this.assignmentDetails.reset();
    });
  }
  UploadFile(event: any) {
    let file = event.target.files[0] as File;
    if (!file) {
      return;
    }
    this.filename = file.name;
    const formData = new FormData();
    formData.append('file', file);
    this.adminService.UploadFiles(formData).subscribe((path: string) => {
      this.filePath = path;
    });
  }
  mergeDateTime() {
    let selectedDate: any = this.assignmentDetails.get('assignmentdate')?.value;
    let selectedTime = this.assignmentDetails.get('assignmenttime')?.value;
    if (selectedTime && selectedDate) {
      const date = new Date(
        selectedDate.toLocaleString('en-US', { timeZone: 'Asia/Amman' })
      );
      const time = selectedTime.split(':');
      date.setHours(parseInt(time[0]) + 3);
      date.setMinutes(parseInt(time[1]));
      return date.toISOString();
    }
    return Date.now();
  }
}
