import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit  {
  product: any =null;
  quantity: number = 1;
  selectedColor: string = '';
  totalPrice: number = 0;
  discountCode: string = '';

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;

  orderInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    ward: '',     // Phường/Xã
    district: '', // Quận/Huyện
    province: ''  // Tỉnh/Thành phố
  };


  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private productService: ProductService,
    private locationService: LocationService) {}

    ngOnInit(): void {
      // Gọi API lấy danh sách tỉnh/thành phố
      this.loadProvinces();
  
      // Lấy tham số từ URL
      this.route.queryParams.subscribe(params => {
        const productId = +params['id'];
        this.quantity = +params['quantity'] || 1;
        this.selectedColor = params['color'] || 'default';
  
        if (productId) {
          this.productService.getProductById(productId).subscribe(product => {
            if (product) {
              this.product = product;
              this.updateTotalPrice();
            }
          });
        }
      });
    }
    
  
  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToPayment() {
    if (!this.orderInfo.fullName || !this.orderInfo.phone || !this.orderInfo.address) {
      alert('Vui lòng nhập đầy đủ thông tin nhận hàng!');
      return;  }
    this.router.navigate(['/payment'], {
      state: {
        product: this.product,
        quantity: this.quantity,
        color: this.selectedColor,
        orderInfo: this.orderInfo,
        discountCode: this.discountCode,
        totalPrice: this.totalPrice
      }
    });
  }

  updateTotalPrice() {
    let basePrice = this.product?.price || 0;
    this.totalPrice = basePrice * this.quantity;
  }
  loadProvinces(): void {
    this.locationService.getLocations().subscribe((data) => {
      this.provinces = data;
    });
  }

  onProvinceChange(): void {
    this.districts = this.selectedProvince?.districts || [];
    this.selectedDistrict = null;
    this.wards = [];
    this.selectedWard = null;
  
    // Cập nhật orderInfo
    this.orderInfo.province = this.selectedProvince ? this.selectedProvince.name : '';
    this.orderInfo.district = '';
    this.orderInfo.ward = '';
  }
  
  onDistrictChange(): void {
    this.wards = this.selectedDistrict?.wards || [];
    this.selectedWard = null;
  
    // Cập nhật orderInfo
    this.orderInfo.district = this.selectedDistrict ? this.selectedDistrict.name : '';
    this.orderInfo.ward = '';
  }
  
  onWardChange(): void {
    // Cập nhật orderInfo
    this.orderInfo.ward = this.selectedWard ? this.selectedWard.name : '';
  }
  
}
