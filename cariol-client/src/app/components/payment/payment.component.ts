import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VoucherService } from '../../services/voucher.service';
import { AuthService } from '../../services/auth.service';

interface OrderState {
  product: any;
  quantity: number;
  color: string;
  discountCode: string;
  discountRate: number;
  discountAmount: number;
  totalPrice: number;
  totalPayment: number;
  orderInfo: {
    fullName: string;
    email?: string;
    phone: string;
    address: string;
    province: string;
    district: string;
    ward: string;
  };
}

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  product: any;
  quantity: number = 1;
  selectedColor: string = '';
  discountCode: string = '';
  discountRate: number = 0;
  discountAmount: number = 0;
  shippingFee: number = 0;
  total: number = 0;
  totalPayment: number = 0;
  expressShipping: boolean = true;
  paymentMethod: string = 'COD';
  orderInfo: any = {};
  orderPopupVisible: boolean = false;

  constructor(private router: Router, private http: HttpClient, private voucherService: VoucherService) {
    const userId = localStorage.getItem('user_id');
    console.log("🟢 User ID từ localStorage:", userId);

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
      localStorage.setItem('product', JSON.stringify(this.product));
    } else {
      const savedProduct = localStorage.getItem('product');
      if (savedProduct) {
        this.product = JSON.parse(savedProduct);
      }
    }
  }
  ngOnInit(): void {
    this.updateShippingFee();  // Gọi hàm khi component được khởi tạo
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
    this.totalPayment = this.total - this.discountAmount + this.shippingFee;
    if (this.totalPayment < 0) {
      this.totalPayment = 0; // Đảm bảo không có giá âm
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  completeOrder() {
    console.log("Product khi thanh toán:", this.product);
    console.log("Order Info:", this.orderInfo);
  
    // Kiểm tra nếu sản phẩm không có dữ liệu
    if (!this.product || !this.product._id) {
      console.error("Lỗi: Không tìm thấy thông tin sản phẩm!");
      alert("Lỗi: Không tìm thấy thông tin sản phẩm!");
      return;
    }
  
    // Kiểm tra thông tin đơn hàng hợp lệ
    if (!this.orderInfo.fullName || !this.orderInfo.phone || !this.orderInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
      return;
    }
  
    // Tạo dữ liệu đơn hàng (không cần user_id)
    const orderData = {
      user: {
        name: this.orderInfo.fullName,  // Không cần user_id, chỉ lấy name và email
        email: this.orderInfo.email || '',
      },
      items: [{
        product_id: this.product._id,  // Đảm bảo sử dụng _id đúng của sản phẩm
        name: this.product.name || 'Không có tên',  // Nếu không có tên thì mặc định 'Không có tên'
        price: this.product.price || 0,  // Nếu không có giá thì mặc định 0
        quantity: this.quantity || 1,  // Nếu không có số lượng thì mặc định 1
        color: this.selectedColor,  // Màu sắc của sản phẩm
      }],
      total_price: this.totalPayment,  // Sử dụng totalPayment đã tính toán
      status: 'pending',  // Mặc định là "pending"
      shipping_address: this.orderInfo.address,  // Địa chỉ nhận hàng
      phone: this.orderInfo.phone,  // Số điện thoại của khách hàng
      payment_method: this.paymentMethod,  // Phương thức thanh toán (COD, chuyển khoản...)
      note: '',  // Nếu có ghi chú thêm, bạn có thể thêm vào
      order_date: new Date()  // Thời gian đặt hàng
    };
  
    console.log("📤 Dữ liệu gửi lên server:", orderData); // Log dữ liệu gửi đi để kiểm tra
  
    // Kiểm tra nếu dữ liệu không hợp lệ
    if (!orderData.items.length || !orderData.shipping_address || !orderData.phone) {
      alert("Dữ liệu đơn hàng không hợp lệ!");
      return;
    }
  
    // Gửi đơn hàng lên server
    this.http.post('http://localhost:3002/orders', orderData).subscribe(
      (response) => {
        alert(`Đặt hàng thành công! Tổng tiền: ${this.totalPayment.toLocaleString()} VND`);
        this.router.navigate(['/']);  // Chuyển về trang chủ sau khi đặt hàng
      },
      (error) => {
        alert("Lỗi khi lưu đơn hàng: " + error.message);
        console.error("Lỗi khi gửi đơn hàng:", error);
      }
    );
  }
  
  closePopup() {
    this.orderPopupVisible = false;  // Đóng popup xác nhận
    this.router.navigate(['/']);  // Quay về trang chủ
  }
}  