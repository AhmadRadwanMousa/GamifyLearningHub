import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(public learnerService: LearnerService) {}
  ngOnInit(): void {
    this.learnerService.updateUserId();
    this.learnerService.GetAllOrders();
  }
}
