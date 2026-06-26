import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

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
  private router: Router
) {}

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

}