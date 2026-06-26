import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.orderService.getOrders().subscribe({

      next: (data) => {

        console.log(data);

        this.orders = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}