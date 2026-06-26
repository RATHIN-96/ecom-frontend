import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  onSubmit() {

    if (this.registerForm.valid) {

      const formData = this.registerForm.value;

      // confirm_password backend-ലേക്ക് അയക്കേണ്ട
      delete formData.confirm_password;

      this.authService.register(formData).subscribe({

        next: (res) => {

          alert("Registration Successful");

          console.log(res);

          this.router.navigate(['/login']);

        },

        error: (err) => {

          console.log(err);

          alert("Registration Failed");

        }

      });

    }

  }

}