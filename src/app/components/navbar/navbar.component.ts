import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // Mobile Menu
  mobileMenuOpen = false;

  // Account Dropdown
  accountMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // --------------------------
  // Login Check
  // --------------------------

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  // --------------------------
  // Mobile Menu
  // --------------------------

  toggleMenu() {

    this.mobileMenuOpen = !this.mobileMenuOpen;

  }

  closeMenu() {

    this.mobileMenuOpen = false;

  }

  // --------------------------
  // Account Dropdown
  // --------------------------

  toggleAccountMenu() {

    this.accountMenuOpen = !this.accountMenuOpen;

  }

  closeDropdown() {

    this.accountMenuOpen = false;
    this.mobileMenuOpen = false;

  }

  // Close dropdown when clicking outside

  @HostListener('document:click', ['$event'])

  onDocumentClick(event: Event) {

    const target = event.target as HTMLElement;

    if (
      !target.closest('.account-link') &&
      !target.closest('.custom-dropdown')
    ) {

      this.accountMenuOpen = false;

    }

  }

  // --------------------------
  // Logout
  // --------------------------

  logout() {

  this.closeDropdown();

  Swal.fire({

    title: 'Logout?',

    text: 'Do you really want to logout?',

    icon: 'question',

    showCancelButton: true,

    confirmButtonColor: '#0d6efd',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Logout',

    cancelButtonText: 'Stay'

  }).then((result) => {

    if (result.isConfirmed) {

      this.authService.logout();

      Swal.fire({

        icon: 'success',

        title: 'Logged Out',

        text: 'You have been logged out successfully.',

        timer: 1500,

        showConfirmButton: false

      });

      setTimeout(() => {

        this.router.navigate(['/login']);

      }, 1500);

    }

  });

}

}