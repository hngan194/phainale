import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent], 
  templateUrl: './dashboard-edit-profile.component.html',
  styleUrls: ['./dashboard-edit-profile.component.css']
})
export class DashboardEditProfileComponent implements OnInit {
  data: any;
  res: any;

  profile: any = {
    firstName: "", 
    lastName: "", 
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
  };

  constructor(private _service: DashboardService) {}

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(): void {
    console.log("Submitting profile:", this.profile);

    this._service.changeProfile(this.profile).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.profile = { ...this.profile, ...res.data }; // Chỉ cập nhật các trường có dữ liệu
          alert("Đổi thành công");
        } else {
          alert("Cập nhật thành công nhưng không có dữ liệu mới.");
        }
      },
      error: (err) => {
        console.error("Lỗi khi đổi thông tin:", err);
        alert("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    });
  }

  getData(): void {
    this._service.getProfilebyId().subscribe({
      next: (data) => {
        if (data && data.datas) {
          this.data = data.datas;
          this.profile = { ...this.profile, ...this.data }; // Chỉ cập nhật trường có dữ liệu
        } else {
          alert("Không tìm thấy dữ liệu hồ sơ.");
        }
      },
      error: (err) => {
        console.error("Lỗi khi tải dữ liệu hồ sơ:", err);
        alert("Không thể tải thông tin hồ sơ!");
      }
    });
  }
}

