import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-education-period',
  templateUrl: './manage-education-period.component.html',
  styleUrls: ['./manage-education-period.component.scss'],
})
export class ManageEducationPeriodComponent implements OnInit {
  @ViewChild('DeleteDialog') deleteDialog: any;
  @ViewChild('CreateEducationalPeriodDialog') CreateDialog: any;
  @ViewChild('UpdateEducationalPeriodDialog') UpdateDialog: any;
  educationalPeriods: any;
  eduDetails = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshEducationalPeriods();
  }
  refreshEducationalPeriods() {
    this.adminService.GetAllEducationalPeriod().subscribe((res) => {
      this.educationalPeriods = res;
    });
  }
  openDeleteDialog(id: number) {
    console.log(id);
    let deleteDialog = this.dialog.open(this.deleteDialog);
    deleteDialog.afterClosed().subscribe((result) => {
      if (result === 'Delete') {
        this.adminService.DeleteEducationalPeriod(id).subscribe(
          (res) => {
            if (res === 1) {
              this.toastr.success(
                'A plan has been deleted',
                'Delete notification'
              );
              this.refreshEducationalPeriods();
            } else {
              this.toastr.success(
                'Something went Wrong!',
                'Delete notification'
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  CreateEducationalPeriod() {
    let createDialog = this.dialog.open(this.CreateDialog);
    createDialog.afterClosed().subscribe((result) => {
      if (result) {
        let newPeriod = {
          Startdate: this.eduDetails.get('startDate')?.value,
          Enddate: this.eduDetails.get('endDate')?.value,
        };
        this.adminService
          .CreateEducationalPeriod(newPeriod)
          .subscribe((res: any) => {
            if (!isNaN(res)) {
              this.toastr.info('New Period has been created');
              this.refreshEducationalPeriods();
            } else {
              this.toastr.warning('Something went wrong');
            }
          });
      }
    });
  }
  UpdateEducationalPeriod(educationPeriod: any) {
    this.eduDetails.patchValue({
      startDate: educationPeriod.startdate,
      endDate: educationPeriod.enddate,
    });
    let updateDialog = this.dialog.open(this.UpdateDialog);
    updateDialog.afterClosed().subscribe((result) => {
      if (result) {
        let updatedPeriod = {
          Educationalperiodid: educationPeriod.educationalperiodid,
          Startdate: this.eduDetails.get('startDate')?.value,
          Enddate: this.eduDetails.get('endDate')?.value,
        };
        this.adminService
          .UpdateEducationalPeriod(updatedPeriod)
          .subscribe((res) => {
            if (res === 1) {
              this.toastr.info('Period has been updated');
              this.refreshEducationalPeriods();
            } else {
              this.toastr.error('Period has been updated');
            }
          });
      }
    });
  }
}
