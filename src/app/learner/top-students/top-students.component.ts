import { Component, Input } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-top-students',
  templateUrl: './top-students.component.html',
  styleUrls: ['./top-students.component.scss']
})
export class TopStudentsComponent {
  constructor(public learnerService:LearnerService){}
@Input() isShow: boolean = true;
@Input() courseSequenceId: number = 0;
token: string | null = localStorage.getItem('token');

  getUserIdFromToken(): number{
    if(this.token != null){
      let decodedToken: any = jwtDecode(this.token);
      return decodedToken.userId;
    }
    else{
      return 0;
    }
  }
ngOnInit(){
  this.learnerService.GetSectionByCourseSequenceId(this.courseSequenceId, this.getUserIdFromToken());
  setTimeout(() => {
    this.learnerService.GetTopThreeStudents(this.learnerService.SectionIdFromSequence);
  }, 100);  
}
}
