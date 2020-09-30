import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginSelected: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private appState: AppState) { 
      if (this.appState.get('isAuthenticated')) {
        let redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '/home';
        this.router.navigate([redirect]);
      }
      this.createLoginForm();
      this.createRegisterForm()
    }

  ngOnInit(): void {}

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get loginControl(){
    return this.loginForm.controls;
  }

  get registerControl(){
    return this.registerForm.controls;
  }

  submitLoginForm(form: NgForm){
    if(this.loginForm.valid){
      this.login(this.getLoginFormData(), form);
    }
  }

  submitRegisterForm(form: NgForm){
    if(this.registerForm.valid){
      this.register(this.getRegisterFormData(), form);
    }
  }

  login(user, form) {
  
    this.authService.login(user).subscribe((res) => {

      if (this.appState.get('isAuthenticated')) {

        this.resetForm(form);

        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '/home';

        // Redirect the user
        this.router.navigate([redirect]);
      }

    }, (error) => {
      // DEBUG
      // TODO: Remove this debug statement
      alert(error.error)
    });
  }

  register(user, form) {

    // Attempt to register
    this.authService.register(user)
        .subscribe((res) => {
            // If registration is successful...
            // Reset our form...
            this.resetForm(form);
            alert('Registered successfully wait until your email is approved.')
            // Proceed to the `Login` component
            this.router.navigate(['/login']);
        }, (error) => {
          alert(error.error);
    });
  }

  toggleLoginRegister(){
    this.isLoginSelected = !this.isLoginSelected;
  }

  getLoginFormData(){
    return {
      email: this.loginControl.email.value,
      password: this.loginControl.password.value
    };
  }

  resetForm(form){
    form.form.markAsPristine();
    form.resetForm();
  }

  getRegisterFormData(){
    return {
      name: this.registerControl.name.value,
      email: this.registerControl.email.value,
      password: this.registerControl.password.value
    };
  }
}
