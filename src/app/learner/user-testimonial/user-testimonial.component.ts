import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-testimonial',
  templateUrl: './user-testimonial.component.html',
  styleUrls: ['./user-testimonial.component.scss']
})
export class UserTestimonialComponent {
  constructor(public _learnerService: LearnerService){}
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
  // <!-- The form is disabled by default unless the user hit Add Testimonial --!>
  testimonialFormVisible = false;  
  toggleTestimonialForm() {
    this.testimonialFormVisible = !this.testimonialFormVisible;
  }
  
  dynamicTestimonials: any[] = [];
  
  ngOnInit (){
    this._learnerService.GetTestimonialByUserId(this.getUserIdFromToken());
  }
  
CreateReviewForm: FormGroup = new FormGroup({
    review: new FormControl('', Validators.required),
  });

  SendReview(){
    this._learnerService.CreateTestimonial(this.CreateReviewForm.value);
    this.CreateReviewForm.reset();
  }
  
}
