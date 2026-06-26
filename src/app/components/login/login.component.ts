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

        alert("Login Successful");

        this.router.navigate(['/']);

      },

      error: (err) => {

        console.log(err);

        alert("Invalid Username or Password");

      }

    });

  }

}

}