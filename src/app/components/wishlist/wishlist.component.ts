import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

    this.wishlistService.removeWishlist(id).subscribe({

      next: () => {

        alert("Removed from Wishlist");

        this.loadWishlist();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}