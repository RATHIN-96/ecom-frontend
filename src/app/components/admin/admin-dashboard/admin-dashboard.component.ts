
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DashboardService } from '../../../services/dashboard.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  dashboard: any = {};

  constructor(
    private dashboardService: DashboardService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {

    console.log("Dashboard Loaded");

    this.loadDashboard();

  }

  // Theme Toggle
  toggleTheme(): void {

    this.themeService.toggleTheme();

  }

  // Load Dashboard Data
  loadDashboard(): void {

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
