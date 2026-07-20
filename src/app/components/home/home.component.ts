import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoryService } from '../../services/category.service';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FeaturedProductsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    const isStaff = localStorage.getItem('is_staff');

    if (token && isStaff === 'true') {
      this.router.navigate(['/admin']);
      return;
    }

    this.categoryService.getCategories().subscribe({

      next: (data) => {

        this.categories = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}