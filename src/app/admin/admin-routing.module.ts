import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';

const routes: Routes = [
  {
    path : 'index' ,
    component : IndexComponent
    },
    {path:'Role',component:ManageRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
