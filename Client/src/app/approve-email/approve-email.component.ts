import { Component, OnInit } from '@angular/core';
import { ApproveEmailService } from './approve-email.service';

@Component({
  selector: 'app-approve-email',
  templateUrl: './approve-email.component.html',
  styleUrls: ['./approve-email.component.scss']
})
export class ApproveEmailComponent implements OnInit {

  users: any;
  constructor(private approveEmailService: ApproveEmailService) {
    this.getAllUsers();
  }

  ngOnInit(): void {}

  getAllUsers(){
    this.approveEmailService.getAllUsers().then((result)=>{
      this.users = result;
    }).catch((error)=>{
      alert('Something went wrong....');
    });
  }

  approveEmail(userId, value){
    this.approveEmailService.approveEmail(userId, value).then((result)=>{
      alert('Approved email successfully.')
    }).catch((error)=>{ 
      alert('Something went wrong...')
    })
  }
}
