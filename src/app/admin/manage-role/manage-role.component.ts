import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators ,ValidatorFn  , AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

//validations

//check if the input starts with a letter 
const NameValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const value = control.value;
  const startsWithLetter = /^[a-zA-Z]/.test(value);

  return startsWithLetter
    ? null
    : { 'invalidRoleName': { value: control.value } };
};

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {

  constructor(public _AdminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this._AdminService.GetAllRoles();
  }

  
  // FormGroup
  CreateRoleForm: FormGroup = new FormGroup({
    roleid: new FormControl({ value: '', disabled: true }), // Role ID is disabled
    rolename: new FormControl('', [Validators.required, Validators.minLength(4),NameValidator]), 
  });

  UpdateRoleForm: FormGroup = new FormGroup({
    roleid: new FormControl('', [Validators.required]),
    rolename: new FormControl('', [Validators.required, Validators.minLength(4),NameValidator]),
    userlogins: new FormControl()
  });

  // Getters for error messages
  get roleName() {
    return this.CreateRoleForm.get('rolename');
  }

  // CRUD
  CreateRole() {
    console.log(this.CreateRoleForm.value);
    this._AdminService.CreateRole(this.CreateRoleForm.value);
  }

  DeleteRole(id: number) {
    this._AdminService.DeleteRole(id);
  }

  UpdateRole() {
    this._AdminService.UpdateRole(this.UpdateRoleForm.value);
  }

  // Dialogs
  @ViewChild('CreateDialog') CreateRoleDialog: any;
  @ViewChild('ConfirmationDialog') ConfirmDeleteDialog: any;
  @ViewChild('UpdateDialog') UpdateRoleDialog: any;

  OpenCreateDialog() {
    this.dialog.open(this.CreateRoleDialog, {
      width: '350px',
      height: '210px',
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000
    });
  }

  OpenUpdateDialog(c: any) {
    this.UpdateRoleForm.setValue({
      roleid: c.roleid,
      rolename: c.rolename,
      userlogins: c.userlogins || null
    });
    this.dialog.open(this.UpdateRoleDialog, {
      width: '350px',
      height: '210px',
    });
  }

  OpenConfirmDialog(id: number) {
    var dialog = this.dialog.open(this.ConfirmDeleteDialog);
    dialog.afterClosed().subscribe(
      (result) => {
        if (result == 'yes')
          this.DeleteRole(id);
      }
    );
  }
}
