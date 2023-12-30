import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TestimonialComponent
  ],
  imports: [
    CommonModule,
    LearnerRoutingModule,
    SharedModule
  ]
})
export class LearnerModule { }
