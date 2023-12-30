import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { CartComponent } from './cart/cart.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    CartComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    LearnerRoutingModule
  ]
})
export class LearnerModule { }
