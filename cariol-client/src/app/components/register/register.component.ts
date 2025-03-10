import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() switchPopup = new EventEmitter<string>();

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10,11}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f(): { [key: string]: any } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const registerData = {
      last_name: this.registerForm.get('last_name')?.value,
      first_name: this.registerForm.get('first_name')?.value,
      phone: this.registerForm.get('phone')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.authService.register(registerData)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Đăng ký thành công!');
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error('Đăng ký thất bại: ' + error);
        }
      );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const confirmPass = formGroup.controls[confirmPassword];

      if (confirmPass.errors && !confirmPass.errors['mustMatch']) {
        return;
      }

      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ mustMatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    };
  }

  switchTo(type: string) {
    this.switchPopup.emit(type);
  }

  closePopup() {
    this.close.emit();
  }
}
