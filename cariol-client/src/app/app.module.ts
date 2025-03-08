import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule nếu cần
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';




@NgModule({
  declarations: [
    BlogComponent,
    AboutusComponent,
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CartComponent,
    HomepageComponent,
    ProductDetailsComponent,
    OrderComponent,
    PaymentComponent
  ],
  
  imports: [
    BrowserModule,
    CommonModule, // Thêm CommonModule vào imports
    RouterModule.forRoot([]),// Thêm RouterModule nếu bạn sử dụng routing
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],

  providers: [AuthService, AlertService, ProductService, CartService], // Thêm các service vào đây nếu cần
  bootstrap: [AppComponent] // Bootstrap AppComponent
})
export class AppModule { }