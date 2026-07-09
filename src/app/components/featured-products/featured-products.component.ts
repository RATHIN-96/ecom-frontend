import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.slice(0, 8); 
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  addToCart(productId: number) {

  const cartData = {

    cart: 1,

    product_id: productId,

    quantity: 1

  };

  this.cartService.addToCart(cartData).subscribe({

    next: (res) => {

      Swal.fire({

        icon: 'success',

        title: 'Added to Cart',

        text: 'Product added successfully.',

        timer: 1800,

        showConfirmButton: false

      });

       this.cartService.loadCartCount();

      console.log(res);

    },

    error: (err) => {

      console.log(err);

      Swal.fire({

        icon: 'error',

        title: 'Failed',

        text: 'Unable to add product to cart.'

      });

    }

  });

}

}