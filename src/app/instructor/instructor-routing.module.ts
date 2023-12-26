import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageMaterialComponent } from './manage-material/manage-material.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },

  {
    path: 'material',
    component: ManageMaterialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
