import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveEmailComponent } from './approve-email.component';
 
const routes: Routes = [
  {
    path: '',
    component: ApproveEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveEmailRoutingModule { }
