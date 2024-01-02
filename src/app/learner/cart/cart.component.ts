import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';
import { getToken } from 'src/app/constants/token';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public learnerService: LearnerService) {}
  token: any = getToken();
  userId: number = Number(this.token.userId);

  ngOnInit(): void {
    this.learnerService.updateUserId();
    this.learnerService.GetCartItemsByUserId();
  }
}
