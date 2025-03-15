import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  message: string = '';
  showMessage: boolean = false;
  messageType: string = 'success'; // success | error

  subscribe() {
    if (!this.email.trim()) {
      this.showMessagePopup("Vui lòng nhập email trước khi đăng ký!", "error");
    } else {
      this.showMessagePopup("Cảm ơn bạn đã đăng ký! Hãy kiểm tra email để nhận ưu đãi.", "success");
      this.email = ''; // Xóa email sau khi đăng ký thành công
    }
  }

  showMessagePopup(message: string, type: string) {
    this.message = message;
    this.messageType = type;
    this.showMessage = true;

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}