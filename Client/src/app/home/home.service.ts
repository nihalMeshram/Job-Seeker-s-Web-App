import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpService) { }

  getAllJobSeekers(page, limit, searchQuery){
    return new Promise((resolve, reject)=>{
      let params = page + '/' + limit + (searchQuery ? '/' + searchQuery : ''); 
      this.httpService.makeHttpGetRequest('/api/jobseeker/get-all/'+params).subscribe((data)=>{
        return resolve(data);
      }, (error)=>{
        return reject(error);
      });
    });
  }
}
