import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  showPassword = false;

  showConfirmPassword = false;

  isLoading = false;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router

  ) {

    this.registerForm = this.fb.group({

      first_name: [

        '',

        [

          Validators.required,

          Validators.pattern('^[A-Za-z ]{3,30}$')

        ]

      ],

      last_name: [

        '',

        [

          Validators.required,

          Validators.pattern('^[A-Za-z ]{2,30}$')

        ]

      ],

      username: [

        '',

        [

          Validators.required,

          Validators.pattern('^[a-zA-Z0-9_]{4,20}$')

        ]

      ],

      email: [

        '',

        [

          Validators.required,

          Validators.email

        ]

      ],

      phone: [

        '',

        [

          Validators.required,

          Validators.pattern('^[6-9]\\d{9}$')

        ]

      ],

      password: [

        '',

        [

          Validators.required,

          Validators.pattern(

            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$'

          )

        ]

      ],

      confirm_password: [

        '',

        Validators.required

      ]

    });

  }

  // ==========================
  // Show Password
  // ==========================

  togglePassword() {

    this.showPassword = !this.showPassword;

  }

  // ==========================
  // Show Confirm Password
  // ==========================

  toggleConfirmPassword() {

    this.showConfirmPassword = !this.showConfirmPassword;

  }
  // ==========================
  // Register
  // ==========================

  onSubmit() {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      Swal.fire({

        icon: 'warning',

        title: 'Invalid Form',

        text: 'Please fill all required fields correctly.'

      });

    return;

    }

    // Password Match Validation

    if (

      this.registerForm.value.password !==

      this.registerForm.value.confirm_password

    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Password Mismatch',

        text: 'Password and Confirm Password do not match.'

      });

      return;

    }

    this.isLoading = true;

    const formData = {

      ...this.registerForm.value

    };

    

    delete formData.confirm_password;

    this.authService.register(formData).subscribe({

      next: (res) => {

        this.isLoading = false;

        Swal.fire({

          icon: 'success',

          title: 'Registration Successful 🎉',

          text: 'Welcome to Velora! Please login to continue.',

          timer: 2000,

          showConfirmButton: false

        });

        this.registerForm.reset();

        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 2000);

      },

      error: (err) => {

        this.isLoading = false;

        console.log(err);

        let message = 'Registration failed. Please try again.';

        if (err.error?.username) {

         message = err.error.username[0];

        }

        else if (err.error?.email) {

          message = err.error.email[0];

        }

        else if (err.error?.phone) {

          message = err.error.phone[0];

        }

        Swal.fire({

          icon: 'error',

          title: 'Registration Failed',

          text: message

        });

      }

    });

  }
}