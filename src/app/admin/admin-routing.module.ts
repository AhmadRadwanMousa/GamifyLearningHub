import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageProgramsComponent } from './manage-programs/manage-programs.component';

const routes: Routes = [
  {
    path : 'index' ,
    component : IndexComponent
    },
    {
      path : 'programs' ,
      component : ManageProgramsComponent
      },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
