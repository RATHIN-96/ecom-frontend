
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  constructor(
    private router: Router,
    public themeService: ThemeService
  ) {}

  // Theme Toggle
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Logout
  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');

    this.router.navigate(['/login']);

  }

}
