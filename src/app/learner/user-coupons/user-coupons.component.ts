import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';

@Component({
  selector: 'app-user-coupons',
  templateUrl: './user-coupons.component.html',
  styleUrls: ['./user-coupons.component.scss'],
})
export class UserCouponsComponent implements OnInit {
  constructor(
    public learnerService: LearnerService,
    private clipboard: Clipboard
  ) {}
  ngOnInit(): void {
    this.learnerService.GetAllUserCoupons();
  }
  copyToClipboard(couponCode: string) {
    this.clipboard.copy(couponCode);
  }
}
