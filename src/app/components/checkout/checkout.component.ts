import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import Swal from 'sweetalert2';


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

      Swal.fire({

        icon: 'success',

        title: 'Order Placed',

        text: 'Your order has been placed successfully.',

        timer: 1800,

        showConfirmButton: false

      });

      setTimeout(() => {

        this.router.navigate(['/orders']);

      }, 1800);

      console.log(res);

      this.router.navigate(['/orders']);

    },

    error: (err) => {

      console.log(err);

      Swal.fire({

        icon: 'error',

        title: 'Order Failed',

        text: 'Unable to place your order.'

      });

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

      Swal.fire({

        icon: 'success',

        title: 'Payment Successful',

        text: 'Thank you for shopping with Velora.',

        timer: 2000,

        showConfirmButton: false

      });

      setTimeout(() => {

        this.router.navigate(['/orders']);

      }, 2000);

      console.log(res);

      this.router.navigate(['/orders']);

    },

    error: (err) => {

      console.log(err);

      Swal.fire({

        icon: 'error',

        title: 'Payment Failed',

        text: 'Payment verification failed. Please contact support if payment was deducted.'

      });

    }

  });

}
}