import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //payPal: PayPal
  payAmount: any = 0;
  constructor(public navCtrl: NavController, private payPal: PayPal, private navParams: NavParams) {
    
      this.payAmount = this.navParams.get('paymentAmount');


    console.log("navParams "+this.payAmount);

    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      /*PayPalEnvironmentSandbox: 'AdU-mc_aRKfeLSHz2NMCcWWvCMIRHI-fwXU6kWxCIkSDLo8tfotYftc-dc69I7N9D1cixS59ZV2lYD9x'*/
      PayPalEnvironmentSandbox: 'AVCawIPffHlBkVVCv5Rn9ZsxHkLeWIISILGpXbQmCQ63uuMT-BOGmfOHiKR5fVEE6J7kAHdaKZqkU8O5'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.payAmount, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          //alert("Payment Successful");
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
