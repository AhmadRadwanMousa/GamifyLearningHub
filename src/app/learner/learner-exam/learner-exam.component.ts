import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';
import { LearnerService } from 'src/app/Services/learner.service';

export interface ExamSolution {
  Examsolutionid: number;
  userId?: number;
  questionoptionid?: number;
}

@Component({
  selector: 'app-learner-exam',
  templateUrl: './learner-exam.component.html',
  styleUrls: ['./learner-exam.component.scss']
})
export class LearnerExamComponent {
  constructor(private route: ActivatedRoute, public _instructorService: InstructorService ,
    public _learnerService: LearnerService ) { }
  id: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params?.['examid'];

      this._instructorService.GetQuestionAndOptionsByExamId(this.id);
    });
  }

  selectedOptions: { [key: number]: ExamSolution } = {};

  print() {
    const result = Object.keys(this.selectedOptions).map((key : any) => ({
      Examsolutionid: +key,
      userId: this._learnerService.userId,
      questionoptionid: this.selectedOptions[key]
    }));
    console.log(result);
  }

  Submit(){
    const result = Object.keys(this.selectedOptions).map((key : any) => ({
      Examsolutionid: +key,
      userId: this._learnerService.userId,
      questionoptionid: this.selectedOptions[key]
    }));
    console.log(result);
    this._learnerService.CreateExamSolution(result);

  }
}
