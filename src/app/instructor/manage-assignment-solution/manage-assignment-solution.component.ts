import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-manage-assignment-solution',
  templateUrl: './manage-assignment-solution.component.html',
  styleUrls: ['./manage-assignment-solution.component.scss'],
})
export class ManageAssignmentSolutionComponent implements OnInit {
  @ViewChild('UpdateDialog') UpdateMarkDialog: any;
  constructor(
    public instructorService: InstructorService,
    private route: Router,
    private routeValues: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  assignmentid: number | undefined;
  assignmentsolutionmark = new FormControl(0, [Validators.required]);
  show: boolean = false;
  ngOnInit(): void {
    this.routeValues.params.subscribe((p) => {
      let assignmentId = p['assignmentid'];

      if (!assignmentId) {
        this.route.navigate(['/instructor/assignments']);
      } else {
        this.instructorService.GetAssignmentSolutions(assignmentId);
      }
    });
  }

  OpenUpdateDialog(assignmentsolutionid: number, assignmentId: number) {
    let updateDialog = this.dialog.open(this.UpdateMarkDialog);
    this.assignmentsolutionmark.setValidators(
      Validators.max(this.instructorService.maxMark)
    );
    updateDialog.afterClosed().subscribe((result) => {
      if (result) {
        let mark: any = {
          assignmentsolutionmark: this.assignmentsolutionmark.value,
          assignmentsolutionid: assignmentsolutionid,
        };
        this.instructorService.UpdateAssignmentSolutionMark(mark, assignmentId);
      }
    });
  }
}
