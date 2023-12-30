import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  /**
   *
   */
  constructor(public learnerService: LearnerService) {}
  ngOnInit(): void {
    this.learnerService.GetCartItemsByUserId(this.learnerService.userId);
  }
}
