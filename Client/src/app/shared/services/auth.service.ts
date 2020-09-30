import { AppState } from '../../app.service';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const HEADER = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};

const ROUTE_URI = '/api/auth/';

@Injectable()
export class AuthService {

    redirectUrl: string;

    constructor(public http: HttpClient, private appState: AppState) {
        this.authenticate().subscribe(res=>{
            if ( res === 0) {
                this.appState.set('isAuthenticated', 0);
            } else {
                this.appState.set('isAuthenticated', 1);
                this.appState.set('userData', res);
            }
        });
    }

    // Check whether a user is logged in or not
    authenticate() {
        return this.http.get(`${ROUTE_URI}authenticate`, HEADER);
    }

    // Get user session data object from server if user is logged in
    getSessionData() {
        return this.http.get(`${ROUTE_URI}session`, HEADER);
    }

    login(user) {
        return this.http.post(`${ROUTE_URI}login`, user,HEADER).pipe(
            map((res) => {
                this.appState.set('isAuthenticated', 1);
                this.appState.set('userData', res);
                return res;
            })
        );
    }

    logout() {
        this.appState.set('isAuthenticated', false);
        this.appState.set('userData', {});
        return this.http.post(`${ROUTE_URI}logout`, HEADER);
    }

    register(user) {
        return this.http.post(`${ROUTE_URI}register`, JSON.stringify(user), HEADER);
    }
}
