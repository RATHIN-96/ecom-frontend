import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  wishlist: any[] = [];

  constructor(private wishlistService: WishlistService) {}

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

}