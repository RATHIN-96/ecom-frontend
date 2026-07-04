import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../../services/category.service';

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

      alert("Enter Category Name");

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

          alert("Category Updated Successfully");

          this.categoryName = '';

          this.editingCategoryId = null;

          this.buttonText = 'Add Category';

          this.loadCategories();

        },

        error: (err: any) => {

          console.log(err);

          alert("Update Failed");

        }

      });

    }

    // ADD

    else {

      this.categoryService.addCategory(categoryData).subscribe({

        next: () => {

          alert("Category Added Successfully");

          this.categoryName = '';

          this.loadCategories();

        },

        error: (err: any) => {

          console.log(err);

          alert("Add Failed");

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

    if (!confirm("Are you sure you want to delete this category?")) {

      return;

    }

    this.categoryService.deleteCategory(id).subscribe({

      next: () => {

        alert("Category Deleted Successfully");

        this.loadCategories();

      },

      error: (err: any) => {

        console.log(err);

        alert("Delete Failed");

      }

    });

  }

}