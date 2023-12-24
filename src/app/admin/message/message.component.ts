import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @ViewChild('DeleteConfirmDialog') DeleteConfirmDialog: any;
  @ViewChild('CreateMessageDialog') CreateMessageDialog: any;
  @ViewChild('DetailsDialog') DetailsDialog: any;
  messageDetails = new FormGroup({
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
   
  });
  messageInformation: any;

  constructor(public admin: AdminService, public dialog: MatDialog) {}
 

  ngOnInit() {
    this.admin.getAllMessages();
  }
  CreateMessageForm: FormGroup = new FormGroup({
    name: new FormControl(),
    phonenumber: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
    email: new FormControl(),
    
  });
  CreateMessage() {
    this.admin.CreateMessage(this.CreateMessageDialog.value);
  }
  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteConfirmDialog, {
      panelClass: 'mat-btn',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res === 'yes') {
          this.admin.deleteMessages(id);
        }
      }
    });
  }

  OpenDetailsDialog(messageDetails: any) {
    this.messageInformation = messageDetails;
    this.dialog.open(this.DetailsDialog, {
      width: '600px',
      height: '550px',
    });
  }
}
