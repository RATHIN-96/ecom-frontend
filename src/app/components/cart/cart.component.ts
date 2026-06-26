import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

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

  this.cartService.deleteCartItem(id).subscribe({

    next: () => {
      alert("Product Removed");
      this.loadCart();
    },

    error: (err) => {
      console.log(err);
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
