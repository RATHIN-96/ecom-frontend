import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {

    this.cartService.getCartItems().subscribe({

      next: (data) => {

        this.cartItems = data;

        this.calculateTotal();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  calculateTotal() {

    this.total = 0;

    this.cartItems.forEach(item => {

      this.total += item.product.price * item.quantity;

    });

  }

  
  removeItem(id: number) {

  Swal.fire({

    title: 'Remove Product?',

    text: 'Do you want to remove this product from your cart?',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#dc3545',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Remove',

    cancelButtonText: 'Cancel'

  }).then((result) => {

    if (result.isConfirmed) {

      this.cartService.deleteCartItem(id).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Removed',

            text: 'Product removed from cart.',

            timer: 1800,

            showConfirmButton: false

          });

          
          this.loadCart();
          this.cartService.loadCartCount();

        },

        error: (err) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Failed',

            text: 'Unable to remove product.'

          });

        }

      });

    }

  });

}

changeQuantity(item: any, change: number) {

  const newQuantity = item.quantity + change;

  if (newQuantity <= 0) {

    this.removeItem(item.id);

    return;

  }

  const data = {

    cart: item.cart,
    product_id: item.product.id,
    quantity: newQuantity

  };

  this.cartService.updateCartItem(item.id, data).subscribe({

    next: () => {

      this.loadCart();

    },

    error: (err) => {

      console.log(err);

    }

  });

}

}
