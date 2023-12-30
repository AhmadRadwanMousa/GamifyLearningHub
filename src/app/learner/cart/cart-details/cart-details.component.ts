import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  @Input() cartItems: any[] = [];
  totalPrice: any;
  ngOnInit(): void {
    this.UpdateCartDetails();
  }
  UpdateCartDetails() {
    this.totalPrice = this.cartItems.reduce((accumulator, currentItem) => {
      const discountedPrice =
        currentItem.program.programprice -
        currentItem.program.programprice *
          (currentItem.program.programsale / 100);
      return accumulator + discountedPrice;
    }, 0);
  }
  ngOnChanges(changes: SimpleChanges) {
    if ('cartItems' in changes) {
      this.UpdateCartDetails();
    }
  }
}
