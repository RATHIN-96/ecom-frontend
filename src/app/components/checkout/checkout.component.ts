import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';


declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  order = {
    name: '',
    address: '',
    phone: '',
    payment: 'Cash On Delivery'
  };

  constructor(
  private orderService: OrderService,
  private paymentService: PaymentService,
  private router: Router,
) {}



payNow() {

  this.paymentService.createPayment({

    name: this.order.name,

    phone: this.order.phone,

    address: this.order.address
    

  }).subscribe({

    next: (res) => {

      const options = {

        key: res.key,

        amount: res.amount,

        currency: res.currency,

        name: 'E-Commerce',

        description: 'Order Payment',

        order_id: res.order_id,

        handler: (response: any) => {

          this.verifyPayment(response);

        }

      };

      const rzp = new Razorpay(options);

      rzp.open();

    },

    error: (err) => {

      console.log(err);

    }

  });

}


placeOrder() {

  const data = {

    cart: 1,   
    name: this.order.name,
    phone: this.order.phone,
    address: this.order.address

  };

  this.orderService.placeOrder(data).subscribe({

    next: (res) => {

      alert("Order Placed Successfully");

      console.log(res);

      this.router.navigate(['/orders']);

    },

    error: (err) => {

      console.log(err);

      alert("Order Failed");

    }

  });

}

checkout() {

  if (this.order.payment === 'Cash On Delivery') {

    this.placeOrder();

  } else {

    this.payNow();

  }

}

verifyPayment(response: any) {

  this.paymentService.verifyPayment({

    razorpay_order_id: response.razorpay_order_id,

    razorpay_payment_id: response.razorpay_payment_id,

    razorpay_signature: response.razorpay_signature

  }).subscribe({

    next: (res) => {

      alert("Payment Verified Successfully");

      console.log(res);

      this.router.navigate(['/orders']);

    },

    error: (err) => {

      console.log(err);

      alert("Payment Verification Failed");

    }

  });

}
}