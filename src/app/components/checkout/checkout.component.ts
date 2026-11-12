import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';

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

    pincode: '',

    state: '',

    district: '',

    postoffice: '',

    payment: 'Cash On Delivery'

  };

  // ===========================
  // Cart
  // ===========================

  cartItems: any[] = [];

  total = 0;

  buyNowProduct: any = null;

  buyNowQuantity = 1;

  isBuyNow = false;
  
  buyNowSize: any = null;

  buyNowSizeId: number | null = null;

  deliveryAvailable = false;

  deliveryMessage = '';

  

  

  constructor(

  private orderService: OrderService,

  private paymentService: PaymentService,

  private cartService: CartService,

  private router: Router,

  private activatedRoute: ActivatedRoute,

  private productService: ProductService,

  private http: HttpClient

 ) {}

 ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      if (params['product']) {

        this.isBuyNow = true;

        this.buyNowQuantity = Number(params['qty']) || 1;

        this.buyNowSizeId = Number(params['size']) || null;

        this.productService.getProduct(Number(params['product']))
        .subscribe({

          next: (product) => {

            this.buyNowProduct = product;

            if (this.buyNowSizeId) {

              this.buyNowSize = product.sizes.find(

                (s: any) => s.id === this.buyNowSizeId

              );

            }

            this.total =
              Number(product.discounted_price) *
              this.buyNowQuantity;

          }

        });

      }

      else {

        this.loadCart();

      }

    });

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

          this.total += Number(item.product.discounted_price) * item.quantity;

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

    if (!this.order.pincode?.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Pincode Required',

        text: 'Please enter your delivery pincode.'

      });

      return;

    }   

    if (this.order.payment === 'Cash On Delivery') {

      if (this.isBuyNow) {

        this.placeBuyNowOrder();

      }

      else {

        this.placeOrder();

      }

    }

    else {

      this.payNow();

    }

  }

  checkPincode() {

  if (this.order.pincode.length !== 6) {

    this.deliveryAvailable = false;

    this.deliveryMessage = 'Please enter a valid 6-digit pincode.';

    return;

  }

  this.http.get<any>(
  `http://127.0.0.1:8000/check-pincode/${this.order.pincode}/`
  ).subscribe({

    next: (res) => {

      if (res.success) {

        this.order.state = res.state;

        this.order.district = res.district;

        this.order.postoffice = res.postoffice;

        this.deliveryAvailable = true;

        this.deliveryMessage = '✅ Delivery Available';

      } else {

        this.deliveryAvailable = false;

        this.deliveryMessage = res.message;

      }

    },

    error: () => {

      this.deliveryAvailable = false;

      this.deliveryMessage =
        'Unable to check pincode.';

    }

  });

}

  // ===========================
  // Place Order (COD)
  // ===========================

  placeOrder() {

    const data = {

      cart: 1,

      name: this.order.name,

      phone: this.order.phone,

      address: this.order.address,

      state: this.order.state,

      district: this.order.district,

      postoffice: this.order.postoffice,

      pincode: this.order.pincode

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

  placeBuyNowOrder() {

    const data = {

      product_id: this.buyNowProduct.id,

      quantity: this.buyNowQuantity,

      size_id: this.buyNowSizeId,

      name: this.order.name,

      phone: this.order.phone,

      address: this.order.address,

      state: this.order.state,

      district: this.order.district,

      postoffice: this.order.postoffice,

      pincode: this.order.pincode

    };

    this.orderService.buyNow(data).subscribe({

      next: () => {

        Swal.fire({

          icon: 'success',

          title: 'Order Placed',

          text: 'Buy Now order placed successfully.',

          timer: 1800,

          showConfirmButton: false

        });

        this.router.navigate(['/orders']);

      },

      error: (err) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Order Failed',

          text: 'Unable to place Buy Now order.'

        });

      }

    });

  }

  // ===========================
  // Razorpay
  // ===========================

  payNow() {

  const paymentData = {

    name: this.order.name,

    phone: this.order.phone,

    address: this.order.address,

    product_id: this.buyNowProduct?.id,

    quantity: this.buyNowQuantity,

    size_id: this.buyNowSizeId,

    state: this.order.state,

    district: this.order.district,

    postoffice: this.order.postoffice,

    pincode: this.order.pincode,

  };

  const paymentRequest = this.isBuyNow

    ? this.paymentService.buyNowCreatePayment(paymentData)

    : this.paymentService.createPayment(paymentData);

  paymentRequest.subscribe({

    next: (res: any) => {

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

      Swal.fire({

        icon: 'error',

        title: 'Payment Failed',

        text: 'Unable to create Razorpay order.'

      });

    }

  });

}

  // ===========================
  // Verify Payment
  // ===========================

  verifyPayment(response: any) {

  const verifyData = {

    razorpay_order_id: response.razorpay_order_id,

    razorpay_payment_id: response.razorpay_payment_id,

    razorpay_signature: response.razorpay_signature,

    product_id: this.buyNowProduct?.id,

    quantity: this.buyNowQuantity,

    size_id: this.buyNowSizeId,

  };

  const verifyRequest = this.isBuyNow

    ? this.paymentService.buyNowVerifyPayment(verifyData)

    : this.paymentService.verifyPayment(verifyData);

  verifyRequest.subscribe({

    next: () => {

      if (!this.isBuyNow) {

        this.cartService.loadCartCount();

      }

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
  increaseQty() {

  this.buyNowQuantity++;

  this.total =
    Number(this.buyNowProduct.discounted_price) *
    this.buyNowQuantity;

}

decreaseQty() {

  if (this.buyNowQuantity > 1) {

    this.buyNowQuantity--;

    this.total =
      Number(this.buyNowProduct.discounted_price) *
      this.buyNowQuantity;

  }

}

getDeliveryCharge(): number {

  return this.total >= 999 ? 0 : 50;

}

getGrandTotal(): number {

  return this.total + this.getDeliveryCharge();

}

}