import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss']
})
export class UserEditProfileComponent{
  userId: number = 0;
  fileName: string = '';
  filePath: string = '';
  UserInDashboard:any;
  imagePreview!: string | ArrayBuffer;
  constructor(public learnerService: LearnerService,public adminService: AdminService, public route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.userId = Number(param.get('userid'));
      this.learnerService.GetUserByUserId(this.userId).subscribe({
        next:(res)=>{this.UserInDashboard = res}
      });
    });
    this.learnerService.successFlag = false;
    
    setTimeout(() => {
      this.initializeForm();
    }, 500);
  }
  userDetails = new FormGroup({
    userid: new FormControl(0, Validators.required),
    userimage: new FormControl(),
    firsname: new FormControl(),
    lastname: new FormControl(),
    dateofbirth: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    totalpoints: new FormControl(),
    Roleid: new FormControl(3, Validators.required),

  });
  initializeForm() {
    this.userDetails.patchValue({
      firsname: [this.UserInDashboard.firsname],
      lastname: [this.UserInDashboard.lastname],
      username: [this.UserInDashboard.userlogins[0].username],
      password: [this.UserInDashboard.userlogins[0].password],
      dateofbirth: [this.UserInDashboard.dateofbirth],
    });
    this.imagePreview = this.UserInDashboard.userimage;
    console.log(this.UserInDashboard);
    
  }
  onSubmit() {
    this.userDetails.controls['userid'].setValue(this.userId);
    this.userDetails.controls['userimage'].setValue(this.filePath == '' ? this.UserInDashboard.userimage : this.filePath);
    this.userDetails.controls['firsname'].setValue(this.UserInDashboard.firsname);
    this.userDetails.controls['lastname'].setValue(this.UserInDashboard.lastname);
    this.userDetails.controls['username'].setValue(this.UserInDashboard.userlogins[0].username);
    this.userDetails.controls['password'].setValue(this.UserInDashboard.userlogins[0].password);
    this.userDetails.controls['totalpoints'].setValue(this.UserInDashboard.totalpoints);
    this.userDetails.controls['dateofbirth'].setValue(this.UserInDashboard.dateofbirth);
    if(this.userDetails.valid)
    {
      this.learnerService.UpdateProfile(this.userDetails.value);
    }
  }

  UploadFile(event: any) {
    let fileToUpload = event.target.files[0] as File;
    if (!fileToUpload) {
      return;
    }
    this.fileName = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.adminService.UploadFile(formData).subscribe((path: string) => {
      this.filePath = path;
    });

    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
