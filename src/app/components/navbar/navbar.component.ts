import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(

  private authService: AuthService,
  private router: Router

){}

isLoggedIn(): boolean {

  return !!localStorage.getItem('token');

}

logout(){

  this.authService.logout();

  alert("Logged Out Successfully");

  this.router.navigate(['/login']);

}


}


