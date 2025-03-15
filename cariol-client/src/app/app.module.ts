import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Import AppRoutingModule thay vì RouterModule.forRoot()
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Nếu bạn sử dụng animations
import { CurrencyPipe } from '@angular/common'; // Import CurrencyPipe
// Các components
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CartComponent } from './components/cart/cart.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { CommonQuestionComponent } from './components/common-question/common-question.component';


// Các service
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { VoucherService } from './services/voucher.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    BlogComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CartComponent,
    HomepageComponent,
    ProductDetailsComponent,
    OrderComponent,
    PaymentComponent,
    ProductsComponent,
    FooterComponent,
    BlogDetailComponent,
    CommonQuestionComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    CartDetailComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // Đảm bảo đã import AppRoutingModule thay vì RouterModule.forRoot([])
    BrowserAnimationsModule // Nếu có dùng animations
  ],
  providers: [AuthService, AlertService, ProductService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
