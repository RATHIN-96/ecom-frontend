import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  openedAddressOrderId: number | null = null;

  openedProductsOrderId: number | null = null;

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

  Swal.fire({

    title: 'Cancel Order?',

    text: 'Do you really want to cancel this order?',

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#dc3545',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Yes, Cancel',

    cancelButtonText: 'No'

  }).then((result)=>{

    if(result.isConfirmed){

      this.orderService.cancelOrder(id).subscribe({

        next:(res:any)=>{

          Swal.fire({

            icon:'success',

            title:'Cancelled',

            text:res.message,

            timer:1800,

            showConfirmButton:false

          });

          this.loadOrders();

        },

        error:(err:any)=>{

          Swal.fire({

            icon:'error',

            title:'Failed',

            text:err.error.message

          });

        }

      });

    }

  });

}

  getTruckPosition(order:any):string{

  switch(order.status){

    case 'Pending':
      return '0%';

    case 'Processing':
      return '25%';

    case 'Shipped':
      return '50%';

    case 'Out for Delivery':
      return '75%';

    case 'Delivered':
      return '96%';

    default:
      return '0%';

  }

}

getProgressWidth(order:any):string{

  switch(order.status){

    case 'Pending':
      return '5%';

    case 'Processing':
      return '30%';

    case 'Shipped':
      return '55%';

    case 'Out for Delivery':
      return '80%';

    case 'Delivered':
      return '100%';

    default:
      return '5%';

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

      Swal.fire({

        icon: 'error',

        title: 'Download Failed',

        text: 'Unable to download invoice.'

      });

    }

  });

}

getExpectedStartDate(order: any): Date {

  const date = new Date(order.created_at);

  date.setDate(date.getDate() + 5);

  return date;

}

getExpectedEndDate(order: any): Date {

  const date = new Date(order.created_at);

  date.setDate(date.getDate() + 7);

  return date;

}

// getDeliveryCharge(order: any): number {

//   return Number(order.total_price) >= 999 ? 0 : 50;

// }

toggleAddress(orderId: number) {

  this.openedAddressOrderId =
    this.openedAddressOrderId === orderId
      ? null
      : orderId;

}

toggleProducts(orderId: number) {

  this.openedProductsOrderId =
    this.openedProductsOrderId === orderId
      ? null
      : orderId;

}

}