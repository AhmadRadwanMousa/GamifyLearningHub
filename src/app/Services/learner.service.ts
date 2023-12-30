import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { getToken } from '../constants/token';

@Injectable({
  providedIn: 'root',
})
export class LearnerService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    let token: any = getToken();
    this.userId = token.userId;
  }
  userId: any;
  CartItemsByUserId: any = [];
  CartTotal: any;
  CartId: any;
  GetCartItemsByUserId(userId: number) {
    this.spinner.show();
    this.http.get(`${URL}/CartItems/` + userId).subscribe(
      (res: any) => {
        this.CartItemsByUserId = res;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.CartId = res[0].cartid;
        let cartId = 0;
        if (res && res[0] && res[0].cartid) {
          cartId = res[0].cartid;
        }
        this.CartId = cartId;
        this.CartTotal = res.reduce((accumulator: any, currentItem: any) => {
          const discountedPrice =
            currentItem.program.programprice -
            currentItem.program.programprice *
              (currentItem.program.programsale / 100);
          return accumulator + discountedPrice;
        }, 0);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
    );
  }
  AddCartItem(cartItemDetails: any) {
    this.spinner.show();
    this.http.post(`${URL}/CartItems`, cartItemDetails).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.show('Item has been added to your cart');
          }, 1000);
        }
      },
      (error) => {
        console.log(error.message);
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.info('item is already exist on your cart ');
        }, 1000);
      }
    );
  }
  DeleteCartItem(cartItemId: any, cartItemPrice: number) {
    this.spinner.show();
    this.http
      .delete(`${URL}/CartItems/` + cartItemId + '/' + cartItemPrice)
      .subscribe(
        (res) => {
          if (res) {
            this.GetCartItemsByUserId(this.userId);
            setTimeout(() => {
              this.toastr.success('Item has been deleted from your cart!');
              this.spinner.hide();
            }, 1000);
          }
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.info('item is already exist on your cart ');
          }, 1000);
        }
      );
  }
  CreatePayment(paymentDetails: any) {
    this.spinner.show();
    this.http.post(`${URL}/Payment`, paymentDetails).subscribe(
      (res) => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.success(
              'Thank you for your shopping with us',
              'Successfully paid!'
            );
          }, 1000);
        }
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          console.log(error);
          this.toastr.info('item is already exist on your cart ');
        }, 1000);
      }
    );
  }
  AlertShow: boolean = false;

  CreateTestimonial(data: any) {
    data.userid = this.userId;
    console.log(data);

    this.spinner.show();
    this.http.post('https://localhost:7036/api/Testimonial', data).subscribe({
      next: () => {
        this.spinner.hide();
        this.AlertShow = true;
      },
      error: (err) => {
        this.spinner.hide();
      },
    });
  }
}
