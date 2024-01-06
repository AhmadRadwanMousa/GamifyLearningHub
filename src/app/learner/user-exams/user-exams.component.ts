import { Component } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-exams',
  templateUrl: './user-exams.component.html',
  styleUrls: ['./user-exams.component.scss']
})
export class UserExamsComponent {


  constructor(public _learnerService: LearnerService) {}
  ngOnInit() {
    this._learnerService.GetAllSectionsByLearnerId();
  }

  selectedSection: any ;
  loadData(sectionId : number){
    this._learnerService.GetAllExamByUserSection(sectionId);
  }

  isButtonEnabled(data: any): boolean {
    const currentDate = new Date();
    const examDate = new Date(data.examdate);
    examDate.setHours(0, 0, 0, 0);
    const openAt = new Date(data.openat);
    const closeAt = new Date(data.closeat);

    return currentDate >= examDate && currentDate >= openAt && currentDate <= closeAt;
}
  

}
