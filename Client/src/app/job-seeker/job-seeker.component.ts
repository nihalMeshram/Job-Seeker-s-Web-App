import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { JobSeekerService } from './job-seeker.service';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {

  jobSeekerForm: FormGroup;
  phoneNumberPattern = "^(0)?[0-9]{10}$";
  emailAndPhone: any;
  @ViewChild('resumeFileInput', {static: false})
  resumeFileInput: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private jobSeekerService: JobSeekerService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.jobSeekerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumberPattern)]),
      resume: new FormControl(null, [Validators.required]),
      likeWorking: new FormControl(null, [Validators.required]),
      recaptcha: new FormControl(null, [Validators.required])
    });
  }

  get form(){
    return this.jobSeekerForm.controls;
  }

  onFileChange($event) { 
    this.jobSeekerForm.patchValue({
      resume: $event.target.files[0]
    });
    this.jobSeekerForm.get('resume').updateValueAndValidity();
  }

  resolved(captchaResponse: string) {
    this.validateToken(captchaResponse);
  }

  validateToken(token){
    this.jobSeekerService.validateToken(token).subscribe(
      data => {},
      err => {}
    );
  }

  submitJobSeekerForm(form: NgForm){
    if(this.jobSeekerForm.valid){
      this.jobSeekerService.submitForm(this.getFormData()).subscribe(
        data => {
          if(!data){
            alert('Email already exist.')
          }else{
            alert('Applied successfully.');
            this.resetForm(form);
          }
        },
        err => {
          alert(err)
        }
      );
    }
  }

  resetForm(form){
    form.form.markAsPristine();
    form.resetForm();
    this.resumeFileInput.nativeElement.value = "";
  }

  private getFormData(){
    let formData = new FormData();
    formData.append("name", this.jobSeekerForm.get('name').value);
    formData.append("email", this.jobSeekerForm.get('email').value);
    formData.append("phoneNumber", this.jobSeekerForm.get('phoneNumber').value);
    formData.append("likeWorking", this.jobSeekerForm.get('likeWorking').value);
    formData.append("recaptcha", this.jobSeekerForm.get('recaptcha').value);
    formData.append("resume", this.jobSeekerForm.get('resume').value);
    return formData;
  }

  signIn(){
    this.router.navigateByUrl('/login');
  }
}
