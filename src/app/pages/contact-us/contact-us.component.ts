import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  constructor(public admin: AdminService) {}

  CreateMessageForm: FormGroup = new FormGroup({
    name: new FormControl(),
    phonenumber: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
    email: new FormControl(),
    messagereceived: new FormControl(),
  });
  PostMessage() {
    this.CreateMessageForm.controls['messagereceived'].setValue(
      new Date().toJSON()
    );
    this.admin.CreateMessage(this.CreateMessageForm.value);
  }
}
