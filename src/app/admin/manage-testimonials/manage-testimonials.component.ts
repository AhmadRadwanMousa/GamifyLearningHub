import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.scss']
})
export class ManageTestimonialsComponent {
  constructor(public _adminService: AdminService, public dialog: MatDialog,private router: Router) {}

  @ViewChild('AcceptDialog') ConfirmationAcceptDialog: any;
  @ViewChild('RejectDialog') ConfirmatioRejectDialog: any;
  @ViewChild('DeatailsDialog') DetailsDialog: any;


  ngOnInit() {
    this._adminService.GetAllTestimonial();
  }

  AcceptTestimonial(id: number) {
    this._adminService.AcceptTestimonial(id);
  }

  OpenAcceptDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmationAcceptDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.AcceptTestimonial(id);
    });
  }



  RejecTestimonial(id: number) {
    this._adminService.RejectTestimonial(id);
  }

  OpenRejectDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmatioRejectDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'yes') this.RejecTestimonial(id);
    });
  }

  data : any = {};
  OpenDetailsDialog(data: any) {
    this.data = data;
    
    var dialog = this.dialog.open(this.DetailsDialog);
    dialog.afterClosed().subscribe((result) => {
      if (result == 'accept') this.AcceptTestimonial(data.testimonialid);
     else if (result == 'reject') this.RejecTestimonial(data.testimonialid);
    });
  }



}
