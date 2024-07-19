import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

    totalAmount: string = "";
    checkoutStatus: boolean = false;

    public payPalConfig ? : IPayPalConfig;
    checkOutForm = this.fb.group({
      username: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      address: ['', [Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required]],
      pincode: ['', [Validators.pattern('[0-9]*'), Validators.required]],
    });


    constructor(private fb: FormBuilder, private toastr: ToastrService,private router:Router,private api:ApiService) {}

    cancel() {
      this.checkOutForm.reset();
    }

    proceedToBuy() {
        if (this.checkOutForm.valid) {
          this.checkoutStatus = true;
          this.totalAmount = sessionStorage.getItem("total") || "";
          this.initConfig()
        } else {
          this.toastr.info("Invalid form");
        }
    }

    private initConfig(): void {
      this.payPalConfig = {
          currency: 'USD',
          clientId: 'sb',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'USD',
                      value: this.totalAmount
                  }
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then((details:any) => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
              this.api.emptyCartApi().subscribe((res:any)=>{
                this.api.getCartCount()
                this.toastr.success("Payment has been successfully complited")
                this.checkoutStatus = false
                this.checkOutForm.reset()
                this.router.navigateByUrl("/")
              })
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.toastr.warning("Transation has been canceled")
              this.checkoutStatus = false
          },
          onError: err => {
              console.log('OnError', err);
              this.toastr.warning("Transation Failed..Please try after sometime")
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
          }
      };
  }
}

