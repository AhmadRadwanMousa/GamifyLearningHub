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
