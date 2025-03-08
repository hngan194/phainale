import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordService } from '../_services/change-password.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-change-password',
  standalone: true, 
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, SidebarComponent], 
  templateUrl: './dashboard-change-password.component.html',
  styleUrls: ['./dashboard-change-password.component.css']
})
export class DashboardChangePasswordComponent {
  changePasswordForm: FormGroup;
  isLoggedIn = true;

  private fb = inject(FormBuilder); 
  private changePasswordService = inject(ChangePasswordService);

  constructor() {    
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: FormGroup) {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      this.changePasswordService.changePassword(formData).subscribe(
        (response: any) => {
          console.log('Password changed successfully:', response);
          this.changePasswordForm.reset();
        },
        (error: any) => {
          console.error('Password change failed:', error);
        }
      );
    }
  }
  
  logout() { 
    console.log("User logged out");
  }
}
