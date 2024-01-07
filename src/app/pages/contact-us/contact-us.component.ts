import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  constructor(public admin: AdminService) {}

  CreateMessageForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phonenumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    subject: new FormControl('', [Validators.required, Validators.minLength(2)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    messagereceived: new FormControl(),
  });
  PostMessage() {
    this.CreateMessageForm.controls['messagereceived'].setValue(
      new Date().toJSON()
    );
    this.admin.CreateMessage(this.CreateMessageForm.value);
  }
}
