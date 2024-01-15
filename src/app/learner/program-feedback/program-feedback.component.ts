import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-program-feedback',
  templateUrl: './program-feedback.component.html',
  styleUrls: ['./program-feedback.component.scss']
})
export class ProgramFeedbackComponent {
  constructor(public learnerService: LearnerService){}
  @Input() userid: number = 0;
  @Input() programid: number  = 0;
  @Input() programName: string = '';
  isSent: boolean = false;
  IsShow: boolean = false;
  Toggle(){
    this.IsShow = !this.IsShow;
  }

  CreateReviewForm: FormGroup = new FormGroup({
    userid: new FormControl(0, Validators.required),
    programid: new FormControl(0, Validators.required),
    reviewrate: new FormControl(1, Validators.required),
    reviewcontent: new FormControl('', Validators.required),
  });

  SendReview(){
    this.CreateReviewForm.controls['userid'].setValue(this.userid);
    this.CreateReviewForm.controls['programid'].setValue(this.programid);
    this.learnerService.PostUserReview(this.CreateReviewForm.value);
    this.isSent = true;
  }
}
