import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { HeaderComponent } from './header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobSeekerModule } from './job-seeker/job-seeker.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { SHARED_APP_SERVICES } from './shared/services/index';
import { NoContentComponent } from './no-content/no-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JobSeekerModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,  
    RecaptchaFormsModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [AppState, SHARED_APP_SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(public appState: AppState){}
}
