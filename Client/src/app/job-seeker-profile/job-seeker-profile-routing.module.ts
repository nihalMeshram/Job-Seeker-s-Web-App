import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobSeekerProfileComponent } from './job-seeker-profile.component';
 
const routes: Routes = [
  {
    path: '',
    component: JobSeekerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerProfileRoutingModule { }
