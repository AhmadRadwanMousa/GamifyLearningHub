import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent {
  
  constructor(public adminService: AdminService,private _liveAnnouncer: LiveAnnouncer){}
  ngOnInit(){
    this.adminService.GetRankingByBadges();
    this.adminService.GetRankingByPoints();
    this.adminService.GetStatistics();
  }
  
  
  displayedColumnsBadges: string[] = ['rank','img', 'name', 'badges'];
  displayedColumnsPoints: string[] = ['rank','img', 'name', 'points'];

  pointsButtonFlag: boolean= false;
  badgesButtonFlag: boolean= true;

  toggleTables(){
    this.pointsButtonFlag = !this.pointsButtonFlag; 
    this.badgesButtonFlag = !this.badgesButtonFlag; 
  }
}



