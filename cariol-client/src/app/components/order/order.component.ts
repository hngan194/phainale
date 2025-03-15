import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LocationService } from '../../services/location.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { VoucherService } from '../../services/voucher.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  product: any = null;
  quantity: number = 1;
  selectedColor: string = '';
  totalPrice: number = 0;
  discountCode: string = '';
  discountMessage: string = '';
  discountAmount: number = 0;
  discountRate: number = 0;
  voucherApplied: boolean = false;
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
    ward: '',
    district: '',
    province: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private locationService: LocationService,
    private http: HttpClient,
    private authService: AuthService,
    private voucherService: VoucherService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();

    if (userId) {
      this.http.get<any>(`http://localhost:3002/users/${userId}`).subscribe(user => {
        this.orderInfo.fullName = user.first_name + ' ' + user.last_name;
        this.orderInfo.email = user.email;
        this.orderInfo.phone = user.phone;
      });
    }

    // Gọi API lấy danh sách tỉnh/thành phố
    this.loadProvinces();

    // Lấy tham số từ URL
    this.route.queryParams.subscribe(params => {
      const productId = params['id'];
      this.quantity = +params['quantity'] || 1;
      this.selectedColor = params['color'] || 'default';

      if (productId) {
        this.productService.getProductById(productId.toString()).subscribe(product => {
          if (product) {
            this.product = product;
            this.updateTotalPrice();
          }
        });
      }
    });
  }

  loadProvinces(): void {
    this.locationService.getLocations().subscribe((data) => {
      this.provinces = data; // Lưu dữ liệu các tỉnh thành
    });
  }

  // Hàm áp dụng giảm giá
  applyDiscount(code: string): void {
    if (this.voucherApplied) {
      alert("Voucher đã được áp dụng rồi!");
      return; // Nếu voucher đã được áp dụng, không cho phép áp dụng lại
    }
    this.voucherService.getDiscountByCode(code).subscribe((discountData) => {
      if (!discountData || discountData.discount == null || isNaN(discountData.discount)) {
        console.warn('Mã giảm giá không hợp lệ hoặc không tìm thấy:', code);
        this.discountAmount = 0;
        this.discountRate = 0;
      } else {
        this.discountRate = discountData.discount; // Lấy phần trăm giảm giá từ database (VD: 20 cho 20%)
        console.log('Tỷ lệ giảm giá:', this.discountRate);
        console.log('Giá gốc:', this.totalPrice);

        // Áp dụng phần trăm giảm giá cho tổng giá sản phẩm
        this.discountAmount = (this.totalPrice * this.discountRate) / 100; // Giảm giá theo phần trăm
        this.updateTotal(); // Cập nhật lại tổng tiền sau khi giảm giá
        this.voucherApplied = true;
      }
    }, error => {
      console.error('Lỗi khi lấy mã giảm giá:', error);
      this.discountAmount = 0;
      this.discountRate = 0;
      this.updateTotal();
    });
  }

  // Tính tổng giá sản phẩm (giá x số lượng)
  updateTotalPrice() {
    const basePrice = this.product?.price || 0;
    this.totalPrice = basePrice * this.quantity;
    if (this.totalPrice < 0) {
      this.totalPrice = 0;
    }
    console.log('Tổng giá sản phẩm:', this.totalPrice);
  }

  // Cập nhật tổng tiền sau khi giảm giá
  updateTotal() {
    // Áp dụng giảm giá vào tổng giá
    this.totalPrice -= this.discountAmount;
    if (this.totalPrice < 0) {
      this.totalPrice = 0;
    }
    console.log('Tổng tiền sau khi giảm giá:', this.totalPrice);
  }

  // Hàm xử lý thay đổi tỉnh
  onProvinceChange(): void {
    if (this.selectedProvince) {
      this.districts = this.selectedProvince.districts || [];
      this.selectedDistrict = null;
      this.wards = [];
      this.selectedWard = null;

      this.orderInfo.province = this.selectedProvince.name || '';  // Kiểm tra trước khi gán
    } else {
      this.districts = [];
      this.wards = [];
      this.selectedDistrict = null;
      this.selectedWard = null;
      this.orderInfo.province = '';
    }
  }

  // Hàm xử lý thay đổi quận huyện
  onDistrictChange(): void {
    if (this.selectedDistrict) {
      this.wards = this.selectedDistrict.wards || [];
      this.selectedWard = null;
      this.orderInfo.district = this.selectedDistrict.name || ''; 
    } else {
      this.wards = [];
      this.selectedWard = null;
      this.orderInfo.district = '';
    }
  }

  // Hàm xử lý thay đổi phường xã
  onWardChange(): void {
    this.orderInfo.ward = this.selectedWard ? this.selectedWard.name || '' : '';
  }

  // Chuyển sang trang thanh toán
  goToPayment() {
    // Kiểm tra thông tin nhận hàng đầy đủ
    if (!this.orderInfo.fullName || !this.orderInfo.phone || !this.orderInfo.address || !this.product) {
      alert('Vui lòng nhập đầy đủ thông tin nhận hàng!');
      return;
    }

    // Lấy user_id và email từ authService
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();

    // Tạo dữ liệu đơn hàng
    const orderData = {
      user: {
        user_id: userId,
        name: this.orderInfo.fullName,
        email: userEmail
      },
      items: [
        {
          product_id: this.product._id,
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
          color: this.selectedColor
        }
      ],
      total_price: this.totalPrice,
      status: "pending",
      order_date: new Date(),
      shipping_address: this.orderInfo.address,
      phone: this.orderInfo.phone,
      payment_method: "online"
    };

    // Lưu đơn hàng vào localStorage trước khi chuyển đến trang thanh toán
    localStorage.setItem('orderData', JSON.stringify(orderData));

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

  // Chuyển về trang giỏ hàng
  goToCart() {
    this.router.navigate(['/cart']);
  }
}
