import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  wishlist: any[] = [];

  selectedProduct: any = null;

  selectedSize: any = null;

  sizeModalVisible = false;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.loadWishlist();

  }

  loadWishlist() {

    this.wishlistService.getWishlist().subscribe({

      next: (data) => {

        console.log(data);

        this.wishlist = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  removeWishlist(id: number) {

    Swal.fire({

      title: 'Remove from Wishlist?',

      text: 'Do you want to remove this product from your wishlist?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#dc3545',

      cancelButtonColor: '#6c757d',

      confirmButtonText: 'Remove',

      cancelButtonText: 'Cancel'

    }).then((result) => {

      if (result.isConfirmed) {

        this.wishlistService.removeWishlist(id).subscribe({

          next: () => {

            Swal.fire({

              icon: 'success',

              title: 'Removed',

              text: 'Product removed from wishlist.',

              timer: 1800,

              showConfirmButton: false

            });

            this.loadWishlist();

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

  openSizeModal(item: any) {  

    this.selectedProduct = item.product;

    this.selectedSize = null;

    this.sizeModalVisible = true;

  }

  closeSizeModal() {  

    this.sizeModalVisible = false;

    this.selectedProduct = null;

    this.selectedSize = null;

  } 

  addToCart(item: any) {

    const data: any = {

      product_id: item.product.id,

      quantity: 1

    };

    if (item.product.has_size) {

      data.size_id = this.selectedSize.id;

    }

    this.cartService.addToCart(data).subscribe({

      next: () => {

        this.cartService.loadCartCount();

        Swal.fire({

          icon: 'success',

          title: 'Added to Cart',

          text: 'Product added successfully.',

          timer: 1500,

          showConfirmButton: false

        });

      },

      error: (err) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Failed',

          text: 'Unable to add product.'

        });

      }

    });

  }

  confirmSelection() {

    if (!this.selectedSize) {

      Swal.fire({

        icon: 'warning',

        title: 'Select Size',

        text: 'Please select a size.'

      });

     return;

    }

    const data = {

      product_id: this.selectedProduct.id,

      quantity: 1,

      size_id: this.selectedSize.id

    };

    this.cartService.addToCart(data).subscribe({

      next: () => {

        this.cartService.loadCartCount();

        this.closeSizeModal();

        Swal.fire({

          icon: 'success',

          title: 'Added to Cart',

          text: 'Product added successfully.',

          timer: 1500,

          showConfirmButton: false

        });

      },

      error: (err) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Failed',

          text: 'Unable to add product.'

        });

      }

    });

  }

}