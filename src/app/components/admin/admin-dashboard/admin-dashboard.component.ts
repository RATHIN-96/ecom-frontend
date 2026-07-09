import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../services/dashboard.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  dashboard: any = {};

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    console.log("Dashboard Loaded");

    this.loadDashboard();

  }

  loadDashboard() {

    this.dashboardService.getDashboard().subscribe({

      next: (data) => {

        console.log(data);

        this.dashboard = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}