import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {

  

  constructor(public _AdminService : AdminService , public dialog: MatDialog){
    
  }

  ngOnInit(){
    this._AdminService.GetAllRoles()
  }

  //FormGroup
  CreateRoleForm : FormGroup = new FormGroup(
    {
      roleid : new FormControl('', [Validators.required]),
      rolename: new FormControl('' , [Validators.required])
    }
  )

  UpdateRoleForm : FormGroup = new FormGroup(
    {
      roleid : new FormControl('', [Validators.required]),
      rolename: new FormControl('' , [Validators.required])
    }
  )

  //CRUD

  CreateRole()
{
  console.log(this.CreateRoleForm.value);
 
  this._AdminService.CreateRole(this.CreateRoleForm.value)
 
}
  DeleteRole(id : number){
    this._AdminService.DeleteRole(id)
  }

  UpdateRole(){
    this._AdminService.UpdateRole(this.UpdateRoleForm.value)
  }

  
  //dialogs

  @ViewChild('CreateDialog') CreateCourseDialog : any
@ViewChild('ConfirmationDialog') ConfirmDeleteDialog : any
@ViewChild('UpdateDialog') UpdateCourseDialog: any

  OpenCreateDialog()
{
this.dialog.open(this.CreateCourseDialog , {
  width: '350px',
  height: '330px',
  enterAnimationDuration: 1000,
  exitAnimationDuration: 1000
 
})
}


 
OpenConfirmDialog(id : number)
{
var dialog = this.dialog.open(this.ConfirmDeleteDialog)
dialog.afterClosed().subscribe(
 
  (result)=>{
    if(result == 'yes')
    this.DeleteRole(id);}
    )
  }
}
