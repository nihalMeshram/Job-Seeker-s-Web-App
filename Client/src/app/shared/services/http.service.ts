import {HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { timeout, catchError,  } from 'rxjs/operators';
import { throwError, Observable } from "rxjs";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient, private router: Router) {}

    public makeHttpGetRequest(url:string, data?:any) {
        return this.makeHttpRequest(url, 'get', data);
    }
    
    public makeHttpPostRequest(url:string, data?:any) {   
        return this.makeHttpRequest(url, 'post', data); 
    }

    public makeHttpDeleteRequest(url:string, data?:any) {
        return this.makeHttpRequest(url, 'delete', data);
    }
      
    private makeHttpRequest(url:string, requestMethod: string, data?:any) {
        let options = {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: data
        };
        let request = this.http.request(requestMethod, url, options);
        return this.intercept(request);        
    } 

    private intercept(request: Observable<any>): Observable<HttpEvent<any>> {
        return request.pipe(
            timeout(10000),
            catchError((error: HttpErrorResponse) => {
                // redirect to the login route
                if (error.status  === 401) {
                    this.router.navigate(['/login']);
                    return Observable.call({});
                } else {
                    return throwError(error);
                }
            })
        )
    }      
}

