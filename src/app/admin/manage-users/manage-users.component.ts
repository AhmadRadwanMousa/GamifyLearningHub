import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  constructor(public adminService: AdminService, public dialog: MatDialog) {}
  @ViewChild('CreateDialog') CreateDialog: any;
  @ViewChild('UpdateDialog') UpdateDialog: any;
  @ViewChild('DeleteDialog') DeleteDialog: any;
  @ViewChild('DetailsDialog') DetailsDialog: any;
  @ViewChild('CreateDetailsInstructorDialog') CreateDetailsInstructorDialog: any;
  @ViewChild('UpdateDetailsInstructorDialog') UpdateDetailsInstructorDialog: any;


  hide = true;
  fileName: string = '';
  filePath: string = '';
  userDetails = new FormGroup({
    firsname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    dateofbirth: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    roleid: new FormControl('', Validators.required),
  });
  userInformation: any;

  RefreshUser() {}
  ngOnInit(): void {
    this.adminService.GetAllUsers();
    this.adminService.GetAllRoles();
  }

  CreateDetailsInstructorForm: FormGroup = new FormGroup({
    userid: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    facebooklink: new FormControl(),
    instagramlink : new FormControl(),
    linkedinlink: new FormControl(),
    twitterlink: new FormControl(),
    experience: new FormControl(),
  });

  UpdateDetailsInstructorForm: FormGroup = new FormGroup({
    instructorid : new FormControl(),
    userid: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    facebooklink: new FormControl(),
    instagramlink : new FormControl(),
    linkedinlink: new FormControl(),
    twitterlink: new FormControl(),
    experience: new FormControl(),
    user : new FormControl(),
  });

  async OpenDetailsInstructorDialog(user: any) {
    console.log(user)
    try {
      await this.adminService.GetInstructorDetailsById(user.userid).toPromise();
  
      if (this.adminService.instructorDetailsById == null) {
        this.CreateDetailsInstructorForm.controls['userid'].setValue(user.userid);
        this.dialog.open(this.CreateDetailsInstructorDialog);
      } else {
       var data = this.adminService.instructorDetailsById;
        this.UpdateDetailsInstructorForm.setValue(data);
        this.dialog.open(this.UpdateDetailsInstructorDialog);
      }
    } catch (error) {
      console.log(error);
    }
  }
  


     CreateDetailsInstructor() {
      this.CreateDetailsInstructorForm.controls['experience'].setValue(this.filePath);  
      this.adminService.CreateDetailsInstructor(this.CreateDetailsInstructorForm.value);
    }

    UpdateDetailsInstructor(){
      this.UpdateDetailsInstructorForm.controls['experience'].setValue(this.filePath);  
      this.adminService.UpdateDetailsInstructor(this.UpdateDetailsInstructorForm.value);

    }


  OpenCreateUserDialog() {
    let createDialog = this.dialog.open(this.CreateDialog, {
      width: '600px',
      height: '480px',
    });
    createDialog.afterClosed().subscribe((result) => {
      if (result) {
        let newUser: any = this.userDetails.value;
        newUser.Userimage = this.filePath;
        newUser.isaccepted = true;
        newUser.lastlogin = new Date();
        console.log(newUser);
        this.adminService.CreateUser(newUser);
      }
      this.userDetails.reset();
    });
  }
  OpenDeleteDialog(id: number) {
    let deleteDialog = this.dialog.open(this.DeleteDialog);
    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.DeleteUser(id);
      }
    });
  }
  OpenUpdateDialog(user: any) {
    let updateDialog = this.dialog.open(this.UpdateDialog, {
      width: '600px',
      height: '480px',
    });
    this.userDetails.patchValue({
      firsname: user.firsname,
      lastname: user.lastname,
      username: user.userlogins[0].username,
      password: user.userlogins[0].password,
      dateofbirth: user.dateofbirth,
      roleid: user.userlogins[0].roleid,
    });
    updateDialog.afterClosed().subscribe((result) => {
      if (result) {
        let updatedUser: any = this.userDetails.value;
        updatedUser.userid = user.userid;
        updatedUser.userimage = this.filePath;
        updatedUser.isaccepted = true;
        updatedUser.totalpoints = user.totalpoints;

        this.adminService.UpdateUser(updatedUser);
      }
      this.userDetails.reset();
    });
  }
  OpenDetailsDialog(userDetails: any) {
    this.userInformation = userDetails;
    this.dialog.open(this.DetailsDialog, {
      width: '600px',
      height: '550px',
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
    this.adminService.UploadFile(formData).subscribe((path: string) => {
      this.filePath = path;
    });
  }
}
