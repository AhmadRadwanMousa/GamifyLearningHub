import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlanDialogComponent } from './create-plan-dialog/create-plan-dialog.component';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.component.html',
  styleUrls: ['./manage-plan.component.scss'],
})
export class ManagePlanComponent implements OnInit {
  plans: any;
  planDetails = new FormGroup({
    planName: new FormControl('', Validators.required),
  });
  fileName: any;
  filePath: any;
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  @ViewChild('DeletePlanDialog') deleteDialog: any;
  @ViewChild('UpdatePlanDialog') updateDialog: any;
  @ViewChild('CreatePlanDialog') createDialog: any;

  ngOnInit(): void {
    this.refreshPlans();
  }
  refreshPlans() {
    this.adminService.GetAllPlans().subscribe((res) => (this.plans = res));
  }
  openDeleteDialog(id: number) {
    let deleteDialog = this.dialog.open(this.deleteDialog);

    deleteDialog.afterClosed().subscribe((result) => {
      if (result === 'Delete') {
        this.adminService.DeletePlan(id).subscribe(
          (res) => {
            if (res === 1) {
              this.toastr.success(
                'A plan has been deleted',
                'Delete notification'
              );
              this.refreshPlans();
            } else {
              this.toastr.error('Something went Wrong!', 'Delete notification');
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  openCreatePlanDialog() {
    let createDialog = this.dialog.open(this.createDialog);
    createDialog.afterClosed().subscribe((result) => {
      console.log(this.planDetails);
      if (result) {
        const newPlan = {
          Planname: this.planDetails.get('planName')?.value,
          Planimage: this.filePath,
        };
        this.adminService.CreatePlan(newPlan).subscribe((res: any) => {
          if (!isNaN(res)) {
            this.toastr.success('Plan has been created!');
            this.refreshPlans();
          }
        });
      }
    });
  }
  openUpdateDialog(plan: any) {
    console.log(plan);
    let updateDialog = this.dialog.open(this.updateDialog);
    this.planDetails.patchValue({
      planName: plan.planname,
    });
    updateDialog.afterClosed().subscribe((result) => {
      if (result) {
        const newPlan = {
          Planname: this.planDetails.get('planName')?.value,
          Planimage: this.filePath,
          Planid: plan.planid,
        };
        this.adminService.UpdatePlan(newPlan).subscribe((res) => {
          debugger;
          if (res === 1) {
            this.toastr.info('Plan has been updated!');
            this.refreshPlans();
          } else {
            this.toastr.error('Something went wrong!');
          }
        });
      }
    });
  }

  UploadFile(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.fileName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.adminService.UploadImage(formData).subscribe(
      (res: any) => {
        this.filePath = res.path;
        if (res) {
          this.toastr.info('Image has been created!', '', {
            easeTime: 300,
            easing: 'ease-in-out',
          });
        }
      },
      (error) => console.log(error)
    );
  }
}
