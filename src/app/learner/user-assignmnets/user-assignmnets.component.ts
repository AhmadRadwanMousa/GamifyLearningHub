import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { InstructorService } from 'src/app/Services/instructor.service';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-assignmnets',
  templateUrl: './user-assignmnets.component.html',
  styleUrls: ['./user-assignmnets.component.scss'],
})
export class UserAssignmnetsComponent implements OnInit, OnDestroy {
  @ViewChild('AssignmentSolutionDetails') AssignmentSolutionDialog: any;
  constructor(
    public learnerService: LearnerService,
    public instructorService: InstructorService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}
  sectionId: number = 0;
  assignmentFilePath: any;
  assignmentSolution: any = {};
  ngOnInit(): void {
    this.learnerService.updateUserId();
    this.learnerService.GetSectionsByUserId();
  }
  GetAssignmentsBySectionId() {
    this.instructorService.GetAssignmentsBySectionId(this.sectionId);
  }
  IsAssignmentClosed(endDate: string | undefined): boolean {
    let dateNow: Date = new Date();
    if (endDate) {
      let deadline: Date = new Date(endDate);
      return dateNow > deadline;
    }
    return false;
  }
  UploadAssignmentSolution(event: any, assignmentId: number) {
    let file = event.target.files[0] as File;
    if (!file) {
      return;
    }
    let fileToUpload = new FormData();
    fileToUpload.append('file', file);
    this.adminService.UploadFiles(fileToUpload).subscribe((res) => {
      this.assignmentFilePath = res;
      this.learnerService
        .GetAssignmentSolutionByUserId(assignmentId)
        .subscribe((res: any) => {
          if (res) {
            this.UpdateAssignmentSolution(res);
          } else {
            this.CreateAssignmentSolution(assignmentId);
          }
        });
    });
  }
  CreateAssignmentSolution(assignmentId: number) {
    let assignmentSolutionDetails: any = {
      assignmentsolutionvalue: this.assignmentFilePath,
      assignmentid: assignmentId,
      userid: this.learnerService.userId,
    };
    this.learnerService.CreateAssignmentSolution(assignmentSolutionDetails);
  }
  UpdateAssignmentSolution(assignmentSolution: any) {
    let assignmentSolutionDetails: any = {
      assignmentsolutionid: assignmentSolution.assignmentsolutionid,
      assignmentsolutionvalue: this.assignmentFilePath,
      assignmentid: assignmentSolution.assignmentid,
      userid: this.learnerService.userId,
    };
    this.learnerService.UpdateAssignmentSolution(assignmentSolutionDetails);
  }

  OpenAssignmentSolutionDetails(assignmentId: number) {
    this.learnerService
      .GetAssignmentSolutionByUserId(assignmentId)
      .subscribe((res: any) => {
        if (res) {
          this.assignmentSolution = res;
        } else {
          this.assignmentSolution = {};
        }
      });

    this.dialog
      .open(this.AssignmentSolutionDialog, {
        width: '400px',
        height: '120px',
      })
      .afterClosed()
      .subscribe((res) => {
        this.assignmentSolution = {};
      });
  }
  IsAssignmentSolutionEmpty(assignmentSolution: any): boolean {
    if (Object.keys(assignmentSolution).length === 0) {
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    this.learnerService.SectionsByUserId = [];
    this.sectionId = 0;
  }
}
