import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';

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

    alert("Please enter a review.");

    return;

  }

  const data = {

    product: this.product.id,
    rating: this.review.rating,
    comment: this.review.comment

  };

  this.reviewService.addReview(data).subscribe({

    next: () => {

      alert("Review Added Successfully");

      this.review.comment = '';
      this.review.rating = 5;

      this.loadReviews();

    },

    error: (err) => {

      console.log(err.error);

      alert("You have already reviewed this product.");

    }

  });

}

deleteReview(id: number) {

  if (!confirm("Delete this review?")) {
    return;
  }

  this.reviewService.deleteReview(id).subscribe({

    next: () => {

      alert("Review Deleted Successfully");

      this.loadReviews();

    },

    error: (err) => {

      console.log(err);

      alert("Unable to delete review");

    }

  });

}

}

