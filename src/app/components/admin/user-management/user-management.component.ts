import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,FormsModule
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

  // Load Users

  loadUsers() {

    this.userService.getUsers().subscribe({

      next: (data: any) => {

        this.users = data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // Block / Unblock User

  toggleStatus(user: any) {

    const action = user.is_active ? 'block' : 'unblock';

    if (!confirm(`Are you sure you want to ${action} ${user.username}?`)) {
      return;
    }

    this.userService.toggleUserStatus(user.id).subscribe({

      next: () => {

        this.loadUsers();

      },

      error: (err: any) => {

        console.log(err);

        alert("Something went wrong.");

      }

    });

  }

  get filteredUsers() {

  return this.users.filter(user =>

    user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||

    user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||

    (user.first_name + ' ' + user.last_name)
      .toLowerCase()
      .includes(this.searchText.toLowerCase())

  );

}

}