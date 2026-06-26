import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

 addToCart() {

  const cartData = {

    product_id: this.product.id,
    quantity: 1

  };

  this.cartService.addToCart(cartData).subscribe({

    next: (res) => {

      alert("Product Added Successfully");

      console.log(res);

    },

    error: (err) => {

      console.log(err.error);

      alert(JSON.stringify(err.error));

    }

  });

}
addToWishlist() {

  const data = {

  product_id: this.product.id

};

  this.wishlistService.addToWishlist(data).subscribe({

    next: (res) => {

      alert("Added to Wishlist ❤️");

      console.log(res);

    },

    error: (err) => {

      console.log(err);

      alert("Already in Wishlist");

    }

  });

}

}

