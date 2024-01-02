import { Component, OnInit } from '@angular/core';
import { LearnerService } from 'src/app/Services/learner.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  /**
   *
   */
  constructor(public learnerService: LearnerService, private route: Router) {}
  view = 'default';
  isPayPalRendered = false;
  ngOnInit(): void {
    this.learnerService.updateUserId();
    this.learnerService.GetCartItemsByUserId();
    this.renderPayPalButton();
  }

  renderPayPalButton() {
    if (this.view === 'paypal' && !this.isPayPalRendered) {
      setTimeout(() => {
        render({
          id: '#paypalbutton',
          currency: 'JD',
          value: this.learnerService.CartTotal,
          onApprove: (details: any) => {
            let paymentDetails: any = {
              Paymentdate: new Date(),
              Userid: this.learnerService.userId,
              Cartid: this.learnerService.CartId,
            };
            this.learnerService.CreatePayment(paymentDetails);
            let cartItems: any[] = this.learnerService.CartItemsByUserId;
            cartItems.map((item: any) =>
              this.learnerService.AddUserToSection(item.sectionid)
            );
            this.route.navigate(['/']);
          },
        });
        this.isPayPalRendered = false;
      });
    }
  }
  OnRadioButtonChange(view: string) {
    this.view = view;
    this.renderPayPalButton();
  }
}
