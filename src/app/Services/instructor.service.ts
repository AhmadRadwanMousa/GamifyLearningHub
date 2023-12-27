import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { URL } from '../constants/url';
import { max } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  sectionsByInstructorId: any = [];
  GetSectionsByInstructorId(instructorId: number) {
    this.spinner.show();
    this.http
      .get(`${URL}/Section/GetSectionsByInstructorId/` + instructorId)
      .subscribe(
        (res) => {
          this.sectionsByInstructorId = res;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.error(error.message, 'Something went wrong');
          }, 1000);
        }
      );
  }
  assignmentsBySection: any = [];
  GetAssignmentsBySectionId(sectionId: number) {
    this.spinner.show();
    this.http.get(`${URL}/Assignment/` + sectionId).subscribe(
      (res) => {
        this.assignmentsBySection = res;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }
  CreateAssignment(newAssignment: any) {
    this.spinner.show();
    this.http.post(`${URL}/Assignment`, newAssignment).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.toastr.success(
            'Assignment has been created',
            'Successfully Created!'
          );
          this.GetAssignmentsBySectionId(newAssignment.sectionid);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }
  DeleteAssignment(assignmentId: number, sectionId: number) {
    this.http.delete(`${URL}/Assignment/` + assignmentId).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.toastr.success(
            'Assignment has been deleted!',
            'Successfully deleted!'
          );
          this.GetAssignmentsBySectionId(sectionId);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }
  UpdateAssignment(updatedAssignment: any) {
    this.http.put(`${URL}/Assignment`, updatedAssignment).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.toastr.success(
            'Assignment has been Updated!',
            'Successfully Updated!'
          );
          this.GetAssignmentsBySectionId(updatedAssignment.sectionid);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }
  //AssignmentSolution
  assignmentSolutions: any = [];
  maxMark: any;
  GetAssignmentSolutions(assignmentId: number) {
    this.spinner.show();
    this.http.get(`${URL}/AssignmentSolution/` + assignmentId).subscribe(
      (res: any) => {
        this.assignmentSolutions = res;

        let maxMark = 0;
        if (
          res &&
          res[0] &&
          res[0].assignment &&
          typeof res[0].assignment.assignmentmark !== 'undefined'
        ) {
          maxMark = res[0].assignment.assignmentmark;
        }
        this.maxMark = maxMark;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
        }, 1000);
      }
    );
  }
  UpdateAssignmentSolutionMark(solutionDetails: any, assignmentId: number) {
    this.http
      .put(
        `${URL}/AssignmentSolution/UpdateAssignmentSolutionMark`,
        solutionDetails
      )
      .subscribe(
        (res) => {
          if (res) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
            this.toastr.success(
              'Assignment has been Updated!',
              'Successfully Updated!'
            );
            this.GetAssignmentSolutions(assignmentId);
          }
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.error(error.message, 'Something went wrong');
          }, 1000);
        }
      );
  }
}
