import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobSeekers: Array<any>;
  loadingJobSeekrs: boolean;
  searchQuery: string;
  page: number;
  limit: number;
  totalPages: number;
  isAdmin: boolean =false;
  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private router: Router,
    private appState: AppState
  ) {
    this.jobSeekers = [];
    this.loadingJobSeekrs = true;
    this.page = 0;
    this.limit = 5;
    this.isAdmin = this.appState.get('userData')['role'] == 'ADMIN' ? true : false;
    this.getAllJobSeekers();
  }

  ngOnInit(): void {}

  getAllJobSeekers() {
    this.loadingJobSeekrs = true;
    this.homeService.getAllJobSeekers(this.page, this.limit, this.searchQuery).then((result: any)=>{
      this.jobSeekers = result.jobSeekers;
      this.totalPages = result.totalPages;
      this.loadingJobSeekrs = false;
    }).catch((error)=>{
      this.loadingJobSeekrs = false;
      alert('Something went wrong....');
    });
  }

  next(){
    if((this.page + 1) <= this.totalPages){
      this.page += 1;
      this.getAllJobSeekers();
    }
  }

  previous(){
    if(this.page > 0){
      this.page -= 1;
      this.getAllJobSeekers();
    }
  }

  searchJobSeeker(searchQuery){
    this.page = 0;
    this.searchQuery = searchQuery;
    this.getAllJobSeekers();
  }

  approveEmail(){
    if(this.isAdmin){
      this.router.navigate(['/approve-email']);
    }
  }

  logOut(){
    this.authService.logout().subscribe(res => res, err => this.router.navigate(['/login']));
  }

}
