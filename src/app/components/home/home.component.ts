import { Component ,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoryService } from '../../services/category.service';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,FeaturedProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe({
      next:(data)=>{
        console.log(data);
        this.categories=data;
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }

}







//@Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }
