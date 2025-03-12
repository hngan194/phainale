import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']  // Chỉnh sửa styleUrls thay vì styleUrl
})
export class OrderComponent implements OnInit  {
  product: any = null;
  quantity: number = 1;
  selectedColor: string = '';
  totalPrice: number = 0;
  discountCode: string = '';

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedProvince: any = null;
  selectedDistrict: any = null;
  selectedWard: any = null;

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
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    // Gọi API lấy danh sách tỉnh/thành phố
    this.loadProvinces();

    // Lấy tham số từ URL
    this.route.queryParams.subscribe(params => {
      const productId = params['id'];  // productId là chuỗi
      this.quantity = +params['quantity'] || 1; // Kiểm tra nếu không có quantity thì mặc định là 1
      this.selectedColor = params['color'] || 'default'; // Kiểm tra nếu không có color thì mặc định là 'default'

      if (productId) {
        // Lấy thông tin sản phẩm bằng productId (chuyển thành chuỗi nếu cần)
        this.productService.getProductById(productId.toString()).subscribe(product => {
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
    // Kiểm tra thông tin nhận hàng đầy đủ
    if (!this.orderInfo.fullName || !this.orderInfo.phone || !this.orderInfo.address) {
      alert('Vui lòng nhập đầy đủ thông tin nhận hàng!');
      return;
    }

    // Chuyển hướng đến trang thanh toán với dữ liệu cần thiết
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
    let basePrice = this.product?.price || 0; // Nếu không có price thì mặc định là 0
    this.totalPrice = basePrice * this.quantity; // Tính tổng giá
  }

  loadProvinces(): void {
    this.locationService.getLocations().subscribe((data) => {
      this.provinces = data; // Lưu dữ liệu các tỉnh thành
    });
  }

  onProvinceChange(): void {
    // Cập nhật quận huyện khi tỉnh thành thay đổi
    this.districts = this.selectedProvince?.districts || [];
    this.selectedDistrict = null;
    this.wards = [];
    this.selectedWard = null;

    // Cập nhật thông tin địa chỉ vào orderInfo
    this.orderInfo.province = this.selectedProvince ? this.selectedProvince.name : '';
    this.orderInfo.district = '';
    this.orderInfo.ward = '';
  }

  onDistrictChange(): void {
    // Cập nhật phường xã khi quận huyện thay đổi
    this.wards = this.selectedDistrict?.wards || [];
    this.selectedWard = null;

    // Cập nhật thông tin địa chỉ vào orderInfo
    this.orderInfo.district = this.selectedDistrict ? this.selectedDistrict.name : '';
    this.orderInfo.ward = '';
  }

  onWardChange(): void {
    // Cập nhật phường xã vào orderInfo
    this.orderInfo.ward = this.selectedWard ? this.selectedWard.name : '';
  }
}
