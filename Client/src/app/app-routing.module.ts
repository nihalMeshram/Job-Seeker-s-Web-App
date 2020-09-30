import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobSeekerComponent } from './job-seeker/job-seeker.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { NoContentComponent } from './no-content/no-content.component';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/job-seeker',
    pathMatch: 'full'
  },
  {
    path: 'job-seeker',
    component: JobSeekerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    data: {roles:['ADMIN', 'EMPLOYER']},
    loadChildren : () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'job-seeker-profile/:id',
    canActivate: [AuthGuard],
    data: {roles:['ADMIN', 'EMPLOYER']},
    loadChildren : () => import('./job-seeker-profile/job-seeker-profile.module').then(m => m.JobSeekerProfileModule)
  },
  {
    path: 'approve-email',
    canActivate: [AuthGuard],
    data: {roles:['ADMIN']},
    loadChildren : () => import('./approve-email/approve-email.module').then(m => m.ApproveEmailModule)
  },
  {
    path: '**', component: NoContentComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
