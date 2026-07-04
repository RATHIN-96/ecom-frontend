import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

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

      alert("Product Updated Successfully");

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

      alert("Product Added Successfully");

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

    this.description = '';

    this.categoryId = '';

    this.selectedImage = undefined as any;

  }

  editProduct(product: any) {

  this.productName = product.name;

  this.price = product.price;

  this.description = product.description;

  this.categoryId = product.category.id;

  this.editingProductId = product.id;

  this.buttonText = "Update Product";

}

deleteProduct(id: number) {

  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }

  this.productService.deleteProduct(id).subscribe({

    next: () => {

      alert("Product Deleted Successfully");

      this.loadProducts();

    },

    error: (err: any) => {

      console.log(err);

      alert("Delete Failed");

    }

  });

}

}