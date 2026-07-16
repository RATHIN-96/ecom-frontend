import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  selectedProduct: any = null;
  selectedSize: any = null;
  sizeModalVisible = false;
  isBuyNow = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private router: Router
  ) {}


ngOnInit(): void {

  this.loadProducts();
  this.loadCategories();


}

openSizeModal(product: any) {

  this.selectedProduct = product;

  this.selectedSize = null;

  this.sizeModalVisible = true;

}

closeSizeModal() {

  this.sizeModalVisible = false;

  this.selectedProduct = null;

  this.selectedSize = null;

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

openBuyNowModal(product: any) {

    this.selectedProduct = product;

    this.selectedSize = null;

    this.isBuyNow = true;

    this.sizeModalVisible = true;

  }

addToCart(product: any) {

  const productId = this.selectedProduct.id;
  const sizeId = this.selectedSize.id;

  const data = {

    product_id: productId,

    quantity: 1,

    size_id: sizeId

  };

  this.cartService.addToCart(data).subscribe({

    next: () => {

      this.cartService.loadCartCount();

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

confirmAddToCart() {

  if (!this.selectedProduct) {

    Swal.fire({

      icon: 'error',

      title: 'Product not found'

    });

    return;

  }

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

        timer: 1800,

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

buyNow(product: any) {

  this.router.navigate(

    ['/checkout'],

    {

      queryParams: {

        product: product.id,

        qty: 1

      }

    }

  );

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

  if (this.isBuyNow) {

    const productId = this.selectedProduct.id;
    const sizeId = this.selectedSize.id;

    this.closeSizeModal();

    this.router.navigate(
      ['/checkout'],
      {
        queryParams: {
          product: productId,
          qty: 1,
          size: sizeId
        }
      }
    );

  } 

  else {

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

          timer: 1500,

          showConfirmButton: false

        });

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}

}