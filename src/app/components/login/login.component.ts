import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword = false;

  isLoading = false;

  loginData = {

    username: '',

    password: ''

  };

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  // ===========================
  // Show / Hide Password
  // ===========================

  togglePassword() {

    this.showPassword = !this.showPassword;

  }

  // ===========================
  // Login
  // ===========================

  login() {

    if (!this.loginData.username.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Username Required',

        text: 'Please enter your username.'

      });

      return;

    }

    if (!this.loginData.password.trim()) {

      Swal.fire({

        icon: 'warning',

        title: 'Password Required',

        text: 'Please enter your password.'

      });

      return;

    }

    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({

      next: (res: any) => {

        this.isLoading = false;

        // Save Token

        localStorage.setItem('token', res.token);

        // Save Admin/User

        localStorage.setItem(

          'is_staff',

          String(res.is_staff)

        );

        Swal.fire({

          icon: 'success',

          title: 'Login Successful',

          text: 'Welcome to Velora.',

          timer: 1500,

          showConfirmButton: false

        });

        setTimeout(() => {

          if (res.is_staff) {

            this.router.navigate(['/admin']);

          }

          else {

            this.router.navigate(['/']);

          }

        }, 1500);

      },

      error: (err) => {

        this.isLoading = false;

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Login Failed',

          text: 'Invalid username or password.'

        });

      }

    });

  }

}