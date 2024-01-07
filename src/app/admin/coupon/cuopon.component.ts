import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-cuopon',
  templateUrl: './cuopon.component.html',
  styleUrls: ['./cuopon.component.scss']
})
export class CuoponComponent {
  @ViewChild('CreateCouponDialog') CreateCouponDialog: any;
  @ViewChild('DeleteConfirmDialog') DeleteConfirmDialog: any;
  @ViewChild('UpdateDialog') UpdateDialog: any;
  constructor(public admin: AdminService, public dialog: MatDialog) {}
  previous_data: any;

  ngOnInit() {
    this.admin.getAllCoupon();
  }
  
  CreateCouponForm: FormGroup = new FormGroup({
    couponname: new FormControl('', [Validators.required]),
    couponpercent: new FormControl('', [Validators.required, this.percentGreaterThanZero]),
    points: new FormControl('', [Validators.required, this.pointsGreaterThanZero]),
  });
  
  UpdateCouponForm: FormGroup = new FormGroup({
    couponid: new FormControl(),
    couponname: new FormControl('', [Validators.required]),
    couponpercent: new FormControl('', [Validators.required, this.percentGreaterThanZero]),
    points: new FormControl('', [Validators.required, this.pointsGreaterThanZero]),
  });
  
  percentGreaterThanZero(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== null && (isNaN(value) || value <= 0)) {
      return { 'percentGreaterThanZero': true };
    }
    return null;
  }
  
  pointsGreaterThanZero(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value !== null && (isNaN(value) || value <= 0)) {
      return { 'pointsGreaterThanZero': true };
    }
    return null;
  }

  CreateCoupon() {
    this.admin.createCoupon(this.CreateCouponForm.value);
    console.log(this.CreateCouponForm.value);
  }

  OpenCreateDialog() {
    this.dialog.open(this.CreateCouponDialog, {
      width: '600px',
      height: '350px',
    });
  }

  openUpdateDialog(_coupon: any) {
    this.previous_data = {
      couponid: _coupon.couponid,
      couponname: _coupon.couponname,
      couponpercent: _coupon.couponpercent,
      points: _coupon.points,
      usercoupons: _coupon.usercoupons
    };
    console.log(this.previous_data);
    this.UpdateCouponForm.controls['couponid'].setValue(
      this.previous_data.couponid
    );

    this.dialog.open(this.UpdateDialog, {
      width: '600px',
      height: '350px',
    });
  }

  UpdateCoupon() {
    console.log(this.UpdateCouponForm.value);

    this.admin.updateCoupon(this.UpdateCouponForm.value);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteConfirmDialog, {
      panelClass: 'mat-btn',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res === 'yes') {
          this.admin.deleteCoupon(id);
        }
      }
    });
  }
}
