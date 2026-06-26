import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(

  private authService: AuthService,
  private router: Router

){}

logout(){

  this.authService.logout();

  alert("Logged Out Successfully");

  this.router.navigate(['/login']);

}

}


