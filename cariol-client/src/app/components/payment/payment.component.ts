import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface OrderState {
  product: any;
  quantity: number;
  color: string;
  discountCode: string;
  totalPrice: number;
  totalPayement: number;
  orderInfo: {
    fullName: string;
    email?: string;
    phone: string;
    address: string;
    province: string;
    district: string;
    ward:string;
  };
}


@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})


export class PaymentComponent {
  product: any;
  quantity: number = 1;
  selectedColor: string = '';
  discountCode: string = '';
  shippingFee: number = 0;
  total: number = 0;
  totalPayment: number = 0;
  expressShipping: boolean = false;
  paymentMethod: string = 'COD';
  orderInfo: any = {};

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as OrderState;

    if (state) {
      this.product = state.product;
      this.quantity = state.quantity || 1;
      this.selectedColor = state.color || 'Không xác định';
      this.discountCode = state.discountCode || '';
      this.total = state.totalPrice || 0;
      // Nhận thông tin địa chỉ đầy đủ từ Order
      this.orderInfo = {
        fullName: state.orderInfo.fullName || '',
        email: state.orderInfo.email || '',
        phone: state.orderInfo.phone || '',
        address: this.formatAddress(state.orderInfo) // Gọi hàm format địa chỉ
      };
      this.updateTotal();
    }
  }

  formatAddress(orderInfo: any): string {
    let addressParts = [
      orderInfo.address,
      orderInfo.ward,
      orderInfo.district,
      orderInfo.province
    ];
  
    return addressParts.filter(part => part && part.trim() !== '').join(', ');
  }

  updateShippingFee() {
    this.shippingFee = this.expressShipping ? 20000 : 0;
    this.updateTotal();
  }

  updateTotal() {
    this.totalPayment = this.total + this.shippingFee;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  completeOrder() {
    console.log('Đơn hàng hoàn tất:', { 
      product: this.product, 
      quantity: this.quantity,
      color: this.selectedColor,
      orderInfo: this.orderInfo,
      paymentMethod: this.paymentMethod,
      total: this.total 
    });
    this.router.navigate(['/']);
  }
}
