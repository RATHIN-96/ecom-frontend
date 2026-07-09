import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  // ===========================
  // Order Form
  // ===========================

  order = {

    name: '',

    address: '',

    phone: '',

    payment: 'Cash On Delivery'

  };

  // ===========================
  // Cart
  // ===========================

  cartItems: any[] = [];

  total = 0;

  constructor(

    private orderService: OrderService,

    private paymentService: PaymentService,

    private cartService: CartService,

    private router: Router

  ) {}

  ngOnInit(): void {

    this.loadCart();

  }

  // ===========================
  // Load Cart
  // ===========================

  loadCart() {

    this.cartService.getCartItems().subscribe({

      next: (data: any[]) => {

        this.cartItems = data;

        this.total = 0;

        data.forEach(item => {

          this.total += item.product.price * item.quantity;

        });

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ===========================
  // Validation
  // ===========================

  checkout() {

    if (!this.order.name.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Name Required',

        text: 'Please enter your full name.'

      });

      return;

    }

    if (!this.order.phone.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Phone Required',

        text: 'Please enter your phone number.'

      });

      return;

    }

    if (!/^[6-9]\d{9}$/.test(this.order.phone)) {

      Swal.fire({

        icon: 'warning',

        title: 'Invalid Phone Number',

        text: 'Please enter a valid 10-digit mobile number.'

      });

      return;

    }

    if (!this.order.address.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Address Required',

        text: 'Please enter your delivery address.'

      });

      return;

    }

    if (this.order.payment === 'Cash On Delivery') {

      this.placeOrder();

    }

    else {

      this.payNow();

    }

  }

  // ===========================
  // Place Order (COD)
  // ===========================

  placeOrder() {

    const data = {

      cart: 1,

      name: this.order.name,

      phone: this.order.phone,

      address: this.order.address

    };

    this.orderService.placeOrder(data).subscribe({

      next: (res) => {

        this.cartService.loadCartCount();

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

  // ===========================
  // Razorpay
  // ===========================

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

          name: 'Velora',

          description: 'Secure Payment',

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

  // ===========================
  // Verify Payment
  // ===========================

  verifyPayment(response: any) {

    this.paymentService.verifyPayment({

      razorpay_order_id: response.razorpay_order_id,

      razorpay_payment_id: response.razorpay_payment_id,

      razorpay_signature: response.razorpay_signature

    }).subscribe({

      next: (res) => {

        this.cartService.loadCartCount();

        Swal.fire({

          icon: 'success',

          title: 'Payment Successful',

          text: 'Thank you for shopping with Velora.',

          timer: 1800,

          showConfirmButton: false

        });

        setTimeout(() => {

          this.router.navigate(['/orders']);

        }, 1800);

      },

      error: (err) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Payment Failed',

          text: 'Payment verification failed.'

        });

      }

    });

  }

}