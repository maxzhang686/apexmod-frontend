import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { Router, NavigationExtras } from '@angular/router';


declare var paypal;

@Component({
  selector: 'app-checkout-paypal',
  templateUrl: './checkout-paypal.component.html',
  styleUrls: ['./checkout-paypal.component.scss']
})
export class CheckoutPaypalComponent implements OnInit {
  loading = false;
  @Input() totalPay: number;
  @ViewChild('paypal', {static:true}) paypalElement: ElementRef;


  product = {
    price: this.totalPay,
    description:"test-product",
    img:'assets/1.png'
  }

  paidFor = false;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) { }



  ngOnInit() {

    paypal
    .Buttons({
      createOrder:(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description:"test-product",
              amount: {
                currency_code: 'AUD',
                value: this.totalPay
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        //this.paidFor = true;
        console.log(order);
        this.router.navigate(['checkout/success']);
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }

  async submitPayPal() {
    console.log(this.totalPay)
  }

}
