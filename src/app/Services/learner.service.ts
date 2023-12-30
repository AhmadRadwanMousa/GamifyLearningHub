import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  GetCartItemsByUserId(userId: number) {
    this.spinner.show();
    this.http.get(`${URL}/CartItems/` + userId).subscribe(
      (res) => {
        this.CartItemsByUserId = res;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      (error) => {
        setTimeout(() => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Something went wrong');
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
  // GetCartByUserId() {
  //   return this.http.get(`${URL}/CartItems/GetCartByUserId/` + this.userId);
  // }
}
