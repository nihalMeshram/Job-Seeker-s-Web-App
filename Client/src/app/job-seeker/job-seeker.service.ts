import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class JobSeekerService {
    constructor(private http: HttpClient) {}

    public validateToken(token){
        return this.http.post<any>("/api/jobseeker/validate-recaptcha", {recaptcha: token})
    }

    public submitForm(postData){
        return this.http.post<any>("/api/jobseeker/job-seeker-form", postData)
    }
}