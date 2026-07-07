import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit {

  orders: any[] = [];

  searchText = '';

  deliveryStatus = [
    'Pending',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];

  paymentStatus = [
    'Pending',
    'Success',
    'Failed',
    'Refunded'
  ];

  refundStatus = [
    'Not Applicable',
    'Pending',
    'Refund Initiated',
    'Refunded',
    'Rejected'
  ];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  // ==========================
  // Load Orders
  // ==========================

  loadOrders() {

    this.orderService.getOrders().subscribe({

      next: (data: any[]) => {

        this.orders = data;

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Failed',

          text: 'Unable to load orders.'

        });

      }

    });

  }

  // ==========================
  // Search
  // ==========================

  get filteredOrders() {

    return this.orders.filter(order =>

      order.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      order.id
        .toString()
        .includes(this.searchText)

    );

  }

  // ==========================
  // Update Delivery Status
  // ==========================

  updateStatus(order: any) {

    const data = {

      status: order.status

    };

    this.orderService.updateOrder(
      order.id,
      data
    ).subscribe({

      next: () => {

        Swal.fire({

          icon: 'success',

          title: 'Updated',

          text: 'Delivery Status Updated Successfully.',

          timer: 1800,

          showConfirmButton: false

        });

        this.loadOrders();

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Update Failed',

          text: 'Unable to update delivery status.'

        });

      }

    });

  }

  // ==========================
  // Update Payment Status
  // ==========================

  updatePayment(order: any) {

    const data = {

      payment_status: order.payment_status

    };

    this.orderService.updateOrder(
      order.id,
      data
    ).subscribe({

      next: () => {

        Swal.fire({

          icon: 'success',

          title: 'Updated',

          text: 'Payment Status Updated Successfully.',

          timer: 1800,

          showConfirmButton: false

        });

        this.loadOrders();

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Update Failed',

          text: 'Unable to update payment status.'

        });

      }

    });

  }

  // ==========================
  // Update Refund Status
  // ==========================

  updateRefund(order: any) {

    const data = {

      refund_status: order.refund_status

    };

    this.orderService.updateOrder(
      order.id,
      data
    ).subscribe({

      next: () => {

        Swal.fire({

          icon: 'success',

          title: 'Updated',

          text: 'Refund Status Updated Successfully.',

          timer: 1800,

          showConfirmButton: false

        });

        this.loadOrders();

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Update Failed',

          text: err.error?.refund_status?.[0] || 'Unable to update refund status.'

        });

      }

    });

  }

}