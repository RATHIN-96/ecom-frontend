import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {

  categories: any[] = [];

  categoryName: string = '';

  editingCategoryId: number | null = null;

  buttonText: string = 'Add Category';

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadCategories();

  }

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

  addCategory() {

    if (!this.categoryName.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Category Required',

        text: 'Please enter a category name.'

      });

      return;

    }

    const categoryData = {

      name: this.categoryName

    };

    // UPDATE

    if (this.editingCategoryId !== null) {

      this.categoryService.updateCategory(
        this.editingCategoryId,
        categoryData
      ).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: 'Category Updated Successfully',

            timer: 1800,

            showConfirmButton: false

          });

          this.categoryName = '';

          this.editingCategoryId = null;

          this.buttonText = 'Add Category';

          this.loadCategories();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Update Failed',

            text: 'Unable to update category.'

          });

        }

      });

    }

    // ADD

    else {

      this.categoryService.addCategory(categoryData).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: 'Category Added Successfully',

            timer: 1800,

            showConfirmButton: false

          });

          this.categoryName = '';

          this.loadCategories();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Add Failed',

            text: 'Unable to add category.'

          });

        }

      });

    }

  }

  editCategory(category: any) {

    this.categoryName = category.name;

    this.editingCategoryId = category.id;

    this.buttonText = "Update Category";

  }

  deleteCategory(id: number) {

  Swal.fire({

    title: 'Delete Category?',

    text: 'This action cannot be undone.',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#dc3545',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Delete',

    cancelButtonText: 'Cancel'

  }).then((result) => {

    if (result.isConfirmed) {

      this.categoryService.deleteCategory(id).subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Deleted',

            text: 'Category Deleted Successfully',

            timer: 1800,

            showConfirmButton: false

          });

          this.loadCategories();

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Delete Failed',

            text: 'Unable to delete category.'

          });

        }

      });

    }

  });

}

}