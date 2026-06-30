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

  getTruckPosition(order:any):string{

  switch(order.status){

    case 'Pending':
      return '0%';

    case 'Paid':
      return '48%';

    case 'Shipped':
      return '83%';

    case 'Delivered':
      return '97%';

    default:
      return '0%';

  }

}

getProgressWidth(order: any): string {

  switch (order.status) {

    case 'Pending':
      return '15%';

    case 'Paid':
      return '53%';

    case 'Shipped':
      return '89%';

    case 'Delivered':
      return '100%';

    default:
      return '15%';

  }

}

downloadInvoice(id: number) {

  this.orderService.downloadInvoice(id).subscribe({

    next: (blob: Blob) => {

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;

      a.download = `Invoice_${id}.pdf`;

      a.click();

      window.URL.revokeObjectURL(url);

    },

    error: (err) => {

      console.log(err);

      alert("Invoice download failed");

    }

  });

}

}