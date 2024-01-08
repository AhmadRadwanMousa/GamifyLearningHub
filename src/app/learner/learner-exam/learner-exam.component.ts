import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
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
export class LearnerExamComponent implements OnDestroy {
  constructor(private route: ActivatedRoute, public _instructorService: InstructorService ,
    public _learnerService: LearnerService ,private router: Router) { }
  id: any;

  private timerSubscription: Subscription | undefined;
  remainingTime: number | any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params?.['examid'];

      this._instructorService.GetQuestionAndOptionsByExamId(this.id);
      this._learnerService.GetExamDetailsById(this.id);
      this.startTimer();

    });
    
  }

  startTimer() {
    const timerInterval = 1000;

    this.timerSubscription = interval(timerInterval).subscribe(() => {
      if (this.isExamEndTimeReached()) {
        this.Submit();
      } else {
        this.updateRemainingTime();
      }
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
    this._learnerService.CreateExamSolution(result);

    setTimeout(() => {
    this.router.navigate(['/learner/mark-exam', this.id]);
  }, 300);

  }

  isExamEndTimeReached(): boolean {
   
    const currentDate = new Date();
    const endAt = new Date(this._learnerService.examDetailsById.closeat);

    return currentDate >= endAt;
  }

  updateRemainingTime() {
    
    const currentDate = new Date();
    const endAt = new Date(this._learnerService.examDetailsById.closeat);
    const remainingSeconds = Math.max(0, Math.floor((endAt.getTime() - currentDate.getTime()) / 1000));

    
    this.remainingTime = remainingSeconds;
  }

  ngOnDestroy() {
    
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
}
