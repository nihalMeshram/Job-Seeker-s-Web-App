import { Component, OnInit } from '@angular/core';
import { JobSeekerProfileService } from './job-seeker-profile.service';
import { ActivatedRoute } from '@angular/router';
import { saveAs }  from 'file-saver';

@Component({
  selector: 'app-job-seeker-profile',
  templateUrl: './job-seeker-profile.component.html',
  styleUrls: ['./job-seeker-profile.component.scss']
})
export class JobSeekerProfileComponent implements OnInit {

  jobSeekerId: string;
  jobSeeker: any;
  comment: string = '';
  constructor(
    private jobSeekerProfileService: JobSeekerProfileService,
    private route: ActivatedRoute) 
  { 
    this.jobSeekerId = this.route.snapshot.params['id'];
    this.getProfileByID();
  }

  ngOnInit(): void {}

  getProfileByID(){
    this.jobSeekerProfileService.getJobSeekerById(this.jobSeekerId).then((jobSeeker: any)=>{
      this.jobSeeker = jobSeeker;
    }).catch((error)=>{
      alert(error.error);
    });
  }

  downloadResume(filename){
    this.jobSeekerProfileService.downloadResume(filename).subscribe( data=>{
      saveAs(data, filename)
    }, error=>{
      alert('Something went wrong....')
    });
  }

  addComment(){
    if(this.comment.trim().length){
      let data = {
        _id: this.jobSeeker._id,
        comment: {
          comment: this.comment,
          to: {
            name: this.jobSeeker.name,
            email: this.jobSeeker.email
          }
        }
      }
      this.jobSeekerProfileService.addComment(data).then((result: any)=>{
        this.comment = '';
        this.jobSeeker.comments = result.comments;
        alert("Commented Successfully")
      }).catch((error)=>{
        alert('Something went wrong');
      });
    }else{
      alert("write something in box");
    }
  }

}
