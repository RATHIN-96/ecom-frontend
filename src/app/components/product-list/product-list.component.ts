import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  categories: any[] = [];

  searchText: string = '';
  selectedPrice: string = '';
  selectedCategory: string = '';
  selectedSort: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService
  ) {}


ngOnInit(): void {

  this.loadProducts();
  this.loadCategories();


}

loadProducts() {

  this.productService.getProducts(this.searchText,this.selectedCategory,this.selectedPrice,this.selectedSort).subscribe({

    next: (data) => {

      this.products = data;

    },

    error: (err) => {

      console.log(err);

    }

  });

}

searchProducts() {

  this.loadProducts();

}
categoryChanged() {

  this.loadProducts();

}
priceChanged() {

  this.loadProducts();

}
sortChanged() {

  this.loadProducts();

}

loadCategories() {

  this.categoryService.getCategories().subscribe({

    next: (data) => {

      this.categories = data;

    },

    error: (err) => {

      console.log(err);

    }

  });

}

addToCart(product: any) {

  const data = {

    product_id: product.id,

    quantity: 1

  };

  this.cartService.addToCart(data).subscribe({

    next: () => {

      Swal.fire({

        icon: 'success',

        title: 'Added to Cart',

        text: 'Product added successfully.',

        timer: 1800,

        showConfirmButton: false

      });

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