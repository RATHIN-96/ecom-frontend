import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: any;

  reviews: any[] = [];

  averageRating = 0;
  reviewCount = 0;

  review = {
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data;
        this.loadReviews();
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

      console.log(err.error);

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: err.error?.message || 'Unable to add product.'
      });

    }

  });

}
addToWishlist() {

  const data = {

  product_id: this.product.id

};

  this.wishlistService.addToWishlist(data).subscribe({

    next: (res) => {

      Swal.fire({
        icon: 'success',
        title: 'Wishlist',
        text: 'Product added to wishlist ❤️',
        timer: 1800,
        showConfirmButton: false
      });

      console.log(res);

    },

    error: (err) => {

      console.log(err);

      Swal.fire({
        icon: 'info',
        title: 'Already Added',
        text: 'This product is already in your wishlist.'
      });

    }

  });

}

loadReviews() {

  this.reviewService.getReviews(this.product.id).subscribe({

    next: (data: any) => {

      this.averageRating = data.average_rating;

      this.reviewCount = data.review_count;

      this.reviews = data.reviews;

    },

    error: (err) => {

      console.log(err);

    }

  });

}

// 

submitReview() {

  if (!this.review.comment.trim()) {

    Swal.fire({
      icon: 'warning',
      title: 'Review Required',
      text: 'Please enter your review.'
    });

    return;

  }

  const data = {

    product: this.product.id,
    rating: this.review.rating,
    comment: this.review.comment

  };

  this.reviewService.addReview(data).subscribe({

    next: () => {

      Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Review submitted successfully.',
        timer: 1800,
        showConfirmButton: false
      });

      this.review.comment = '';
      this.review.rating = 5;

      this.loadReviews();

    },

    error: (err) => {

      console.log(err.error);

      Swal.fire({
        icon: 'info',
        title: 'Already Reviewed',
        text: 'You have already reviewed this product.'
      });

    }

  });

}

deleteReview(id: number) {

  Swal.fire({

    title: 'Delete Review?',

    text: 'This review will be permanently deleted.',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#dc3545',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Delete',

    cancelButtonText: 'Cancel'

  }).then((result) => {

    if (result.isConfirmed) {

      this.reviewService.deleteReview(id).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Deleted',

            text: 'Review deleted successfully.',

            timer: 1800,

            showConfirmButton: false

          });

          this.loadReviews();

        },

        error: () => {

          Swal.fire({

            icon: 'error',

            title: 'Delete Failed',

            text: 'Unable to delete review.'

          });

        }

      });

    }

  });

}

}

