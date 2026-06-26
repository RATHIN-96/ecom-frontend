import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe({

      next: (data) => {

        this.products = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addToCart(product: any) {

    const data = {

      cart: 1,
      product_id: product.id,
      quantity: 1

    };

    this.cartService.addToCart(data).subscribe({

      next: () => {

        alert("Product Added to Cart");

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}