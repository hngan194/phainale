import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems = [
    { title: 'Quản lý vai trò', icon: 'fa-solid fa-key', link: '/roles' },
    { title: 'Quản lý sản phẩm', icon: 'fa-solid fa-box', link: '/products' },
    { title: 'Quản lý đơn hàng', icon: 'fa-solid fa-shopping-cart', link: '/orders' },
    { title: 'Mã giảm giá', icon: 'fa-solid fa-ticket-alt', link: '/discounts' },
    { title: 'Quản lý blog', icon: 'fa-solid fa-newspaper', link: '/blog' },
    // { title: 'Báo cáo doanh thu', icon: 'fa-solid fa-chart-bar', link: '/revenue' }
  ];

  constructor(private router: Router) {}

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
