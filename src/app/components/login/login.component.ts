import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(

  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router

  ){

    this.loginForm = this.fb.group({

      username:[
        '',
        Validators.required
      ],

      password:[
        '',
        Validators.required
      ]

    });

  }

  onSubmit() {

  if (this.loginForm.valid) {

    this.authService.login(this.loginForm.value).subscribe({

      next: (res: any) => {

      console.log(res);

      localStorage.setItem('token', res.token);
      localStorage.setItem('is_staff', res.is_staff);
      localStorage.setItem('username', res.username);
      localStorage.setItem('first_name', res.first_name);

      Swal.fire({

        icon: 'success',

        title: 'Welcome!',

        text: 'Login Successful',

        timer: 1800,

        showConfirmButton: false

      });

      setTimeout(() => {

        if (res.is_staff) {

          this.router.navigate(['/admin']);

        } else {

          this.router.navigate(['/']);

        }

      }, 1800);

    },

      error: (err) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Login Failed',

          text: 'Invalid Username or Password'

        });

      }

    });

  }

}

}