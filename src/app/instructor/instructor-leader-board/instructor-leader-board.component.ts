import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from 'src/app/Services/admin.service';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-instructor-leader-board',
  templateUrl: './instructor-leader-board.component.html',
  styleUrls: ['./instructor-leader-board.component.scss']
})
export class InstructorLeaderBoardComponent {

  @ViewChild('leaderBoardDialog') leaderBoardDialog: any;
  constructor(public dialog:MatDialog, public instructorService: InstructorService){}
  pointsButtonFlag: boolean= false;
  badgesButtonFlag: boolean= true;
  displayedColumnsBadges: string[] = ['rank','img', 'name', 'badges'];
  displayedColumnsPoints: string[] = ['rank','img', 'name', 'points'];
  toggleTables(){
    this.pointsButtonFlag = !this.pointsButtonFlag; 
    this.badgesButtonFlag = !this.badgesButtonFlag; 
  }
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
  }
  OpenDialog(){
    this.dialog.open(this.leaderBoardDialog, {
      width: '800px',
      height: '500px',
    });
  }
}
