import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {
constructor(public _learnerService: LearnerService){}

CreateReviewForm: FormGroup = new FormGroup({
    review: new FormControl('', Validators.required),
  });

  SendReview(){
    this._learnerService.CreateTestimonial(this.CreateReviewForm.value);
    this.CreateReviewForm.reset();

  }
}
