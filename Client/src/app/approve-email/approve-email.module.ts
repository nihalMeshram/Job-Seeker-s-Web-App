import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveEmailComponent } from './approve-email.component';
import { ApproveEmailRoutingModule } from './approve-email-routing.module';

@NgModule({
  declarations: [ApproveEmailComponent],
  imports: [
    CommonModule,
    ApproveEmailRoutingModule
  ]
})
export class ApproveEmailModule { }
