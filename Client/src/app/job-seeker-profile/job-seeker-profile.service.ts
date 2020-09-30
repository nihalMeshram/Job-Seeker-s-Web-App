import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service'

@Injectable({
  providedIn: 'root'
})
export class JobSeekerProfileService {

  constructor(private httpService: HttpService, private http: HttpClient) { }

  getJobSeekerById(id){
    return new Promise((resolve, reject)=>{
      this.httpService.makeHttpGetRequest('/api/jobseeker/get-by-id/'+id).subscribe((data)=>{
        return resolve(data);
      }, (error)=>{
        return reject(error);
      });
    });
  }

  downloadResume(filename){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get('/api/jobseeker/get-resume', 
      { headers: headers,
        responseType: 'blob',
        params:{'filename': filename }
      }
    );
  }

  addComment(comment){
    return new Promise((resolve, reject)=>{
      this.httpService.makeHttpPostRequest('/api/jobseeker/comment', comment).subscribe((data)=>{
        return resolve(data);
      }, (error)=>{
        return reject(error);
      });
    });
  }
}
