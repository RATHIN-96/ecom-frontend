import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';
import Swal from 'sweetalert2';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
   ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  passwordForm!: FormGroup;

  constructor(

  private fb: FormBuilder,
  private profileService: ProfileService

) {

  this.profileForm = this.fb.group({

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

      {
        value: '',
        disabled: true
      }

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

    ]

  });

  this.passwordForm = this.fb.group({

  current_password: [
    '',
    Validators.required
  ],

  new_password: [
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


  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile() {

  this.profileService.getProfile().subscribe({

    next: (data) => {

      this.profileForm.patchValue({

        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        phone: data.phone

      });

    },

    error: (err) => {

      console.log(err);

    }

  });

}

  updateProfile() {

  if (this.profileForm.invalid) {

    this.profileForm.markAllAsTouched();

    return;

  }

  const data = this.profileForm.getRawValue();

  this.profileService.updateProfile(data).subscribe({

    next: () => {

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully.',
        timer: 1800,
        showConfirmButton: false
      });

    },

    error: (err) => {

      console.log(err);

      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Unable to update profile.'
      });

    }

  });

}

  changePassword() {

  if (this.passwordForm.invalid) {

    this.passwordForm.markAllAsTouched();

    return;

  }

  const data = this.passwordForm.value;

  if (data.new_password !== data.confirm_password) {

    Swal.fire({
      icon: 'warning',
      title: 'Password Mismatch',
      text: 'New password and confirm password must match.'
    });

    return;

  }

  this.profileService.changePassword({

    current_password: data.current_password,
    new_password: data.new_password

  }).subscribe({

    next: () => {

      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been updated successfully.',
        timer: 1800,
        showConfirmButton: false
      });

      this.passwordForm.reset();

    },

    error: (err) => {

      console.log(err.error);

      Swal.fire({
        icon: 'error',
        title: 'Password Change Failed',
        text: err.error?.error || 'Unable to change password.'
      });

    }

  });

}

}