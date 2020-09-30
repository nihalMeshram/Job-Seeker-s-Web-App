import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveEmailService {

  constructor(private httpService: HttpService) { }

  getAllUsers(){
    return new Promise((resolve, reject)=>{
      this.httpService.makeHttpGetRequest('/api/approve-email/get-all').subscribe((data)=>{
        resolve(data);
      }, (error)=>{
        reject(error);
      })
    });
  }

  approveEmail(userId, value){
    return new Promise((resolve, reject)=>{
      this.httpService.makeHttpPostRequest('/api/approve-email/approve', {userId: userId, approved: value})
        .subscribe((result)=>{
          resolve(result);
        },(error)=>{
          reject(error);
        });
      });
  }
}
