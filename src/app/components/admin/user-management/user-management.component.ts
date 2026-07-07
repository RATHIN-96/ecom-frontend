import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  users: any[] = [];

  searchText = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.loadUsers();

  }

  // ==========================
  // Load Users
  // ==========================

  loadUsers() {

    this.userService.getUsers().subscribe({

      next: (data: any) => {

        this.users = data;

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Failed',

          text: 'Unable to load users.'

        });

      }

    });

  }

  // ==========================
  // Block / Unblock User
  // ==========================

  toggleStatus(user: any) {

    const action = user.is_active ? 'Block' : 'Unblock';

    Swal.fire({

      title: `${action} User?`,

      text: `Are you sure you want to ${action.toLowerCase()} ${user.username}?`,

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#dc3545',

      cancelButtonColor: '#6c757d',

      confirmButtonText: `Yes, ${action}`,

      cancelButtonText: 'Cancel'

    }).then((result) => {

      if (result.isConfirmed) {

        this.userService.toggleUserStatus(user.id).subscribe({

          next: (res: any) => {

            user.is_active = res.is_active;

            const message = res.is_active
              ? 'User unblocked successfully.'
              : 'User blocked successfully.';

            Swal.fire({

              icon: 'success',

              title: 'Success',

              text: message,

              timer: 1800,

              showConfirmButton: false

            });

          },

          error: (err: any) => {

            console.log(err);

            Swal.fire({

              icon: 'error',

              title: 'Operation Failed',

              text: err.error?.error || 'Something went wrong.'

            });

          }

        });

      }

    });

  }

  // ==========================
  // Search Users
  // ==========================

  get filteredUsers() {

    return this.users.filter(user =>

      user.username
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      user.email
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      (user.first_name + ' ' + user.last_name)
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

}