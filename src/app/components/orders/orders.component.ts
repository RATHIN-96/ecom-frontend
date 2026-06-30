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

    this.loadOrders();

  }

  loadOrders() {

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

  cancelOrder(id: number) {

    if (!confirm("Are you sure you want to cancel this order?")) {

      return;

    }

    this.orderService.cancelOrder(id).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.loadOrders();

      },

      error: (err) => {

        alert(err.error.message);

      }

    });

  }

}