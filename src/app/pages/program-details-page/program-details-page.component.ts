import { Component } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-details-page',
  templateUrl: './program-details-page.component.html',
  styleUrls: ['./program-details-page.component.scss'],
})
export class ProgramDetailsPageComponent {
  constructor(public shard: SharedService, public route: ActivatedRoute){}
  itemId: number = 0

  ngOnInit(){
    this.route.paramMap.subscribe(param => this.itemId = Number(param.get('id')))
    this.shard.getProgramById(this.itemId);
    this.shard.getAllStudentsInProgram(this.itemId);
    this.shard.getAllCoursesInProgram(this.itemId);
  }
  calculateWeeksDuration(): number {
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const diffInMilliseconds = this.formatDate(this.shard.program.educationalperiod.enddate).getTime() - this.formatDate(this.shard.program.educationalperiod.startdate).getTime();
    const diffInWeeks = diffInMilliseconds / millisecondsInWeek;

    return Math.floor(diffInWeeks);
  }
  formatDate(dateString: string): Date {
    return new Date(dateString);
  }
}
