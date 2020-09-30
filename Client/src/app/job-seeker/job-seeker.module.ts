import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerComponent } from './job-seeker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    JobSeekerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class JobSeekerModule {}
