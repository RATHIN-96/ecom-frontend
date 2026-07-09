import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {

  products: any[] = [];
  categories: any[] = [];

  productName = '';
  price: number | null = null;
  discountPercentage = 0;
  description = '';
  categoryId = '';

  selectedImage!: File;

  editingProductId: number | null = null;

  buttonText = "Add Product";

  constructor(

    private productService: ProductService,
    private categoryService: CategoryService

  ) {}

  ngOnInit(): void {

    this.loadProducts();

    this.loadCategories();

  }

  // ------------------------
  // Load Products
  // ------------------------

  loadProducts() {

    this.productService.getProducts().subscribe({

      next: (data: any) => {

        this.products = data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // ------------------------
  // Load Categories
  // ------------------------

  loadCategories() {

    this.categoryService.getCategories().subscribe({

      next: (data: any) => {

        this.categories = data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // ------------------------
  // Image
  // ------------------------

  onImageSelected(event: any) {

    this.selectedImage = event.target.files[0];

  }

  // ------------------------
  // Add Product
  // ------------------------

  saveProduct() {

    const formData = new FormData();

    formData.append('name', this.productName);

    formData.append('price', String(this.price));

    formData.append('discount_percentage',this.discountPercentage.toString());

    formData.append('description', this.description);

    formData.append('category_id', this.categoryId);

    if (this.selectedImage) {

      formData.append('image', this.selectedImage);

    }

    if (this.editingProductId !== null) {

  this.productService.updateProduct(
    this.editingProductId,
    formData
  ).subscribe({

    next: () => {

      Swal.fire({

        icon: 'success',

        title: 'Success',

        text: 'Product Updated Successfully',

        timer: 1800,

        showConfirmButton: false

      });

      this.resetForm();

      this.loadProducts();

      this.editingProductId = null;

      this.buttonText = "Add Product";

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}
else {

  this.productService.addProduct(formData).subscribe({

    next: () => {

      Swal.fire({

        icon: 'success',

        title: 'Success',

        text: 'Product Added Successfully',

        timer: 1800,

        showConfirmButton: false

      });

      this.resetForm();

      this.loadProducts();

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}

  }

  // ------------------------
  // Reset
  // ------------------------

  resetForm() {

    this.productName = '';

    this.price = null;

    this.discountPercentage = 0;

    this.description = '';

    this.categoryId = '';

    this.selectedImage = undefined as any;

  }

  editProduct(product: any) {

  this.productName = product.name;

  this.price = product.price;

  this.discountPercentage = product.discount_percentage;

  this.description = product.description;

  this.categoryId = product.category.id;

  this.editingProductId = product.id;

  this.buttonText = "Update Product";

}

deleteProduct(id: number) {

  Swal.fire({

    title: 'Delete Product?',

    text: 'This action cannot be undone.',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#dc3545',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Delete',

    cancelButtonText: 'Cancel'

  }).then((result) => {

    if (result.isConfirmed) {

      this.productService.deleteProduct(id).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Deleted',

            text: 'Product Deleted Successfully',

            timer: 1800,

            showConfirmButton: false

          });

          this.loadProducts();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Delete Failed',

            text: 'Unable to delete product.'

          });

        }

      });

    }

  });

}

}