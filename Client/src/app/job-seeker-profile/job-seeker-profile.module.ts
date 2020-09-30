import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSeekerProfileComponent } from './job-seeker-profile.component';
import { JobSeekerProfileRoutingModule } from './job-seeker-profile-routing.module';


@NgModule({
  declarations: [JobSeekerProfileComponent],
  imports: [
    CommonModule,
    JobSeekerProfileRoutingModule
  ]
})
export class JobSeekerProfileModule { }
