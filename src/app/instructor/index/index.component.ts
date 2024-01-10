import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(public instructorService: InstructorService){}
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
    this.instructorService.GetInstructorStudents(this.getUserIdFromToken());
    this.instructorService.GetSectionsByInstructorId(this.getUserIdFromToken());
    this.instructorService.GetInstructorName(this.getUserIdFromToken());
    this.instructorService.GetInstructorLectures(this.getUserIdFromToken());
    this.instructorService.GetRankingByPoints2();
  }
}
