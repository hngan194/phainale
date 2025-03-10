import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Đảm bảo đã import FormsModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';  // Đảm bảo import đúng BlogComponent
import { AppRoutingModule } from './app-routing.module';  // Đảm bảo đã import AppRoutingModule
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RoleManagementComponent,  // Đảm bảo BlogComponent được khai báo
    // Các component khác
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Đảm bảo FormsModule được import
    AppRoutingModule,  // Đảm bảo AppRoutingModule đã được import
    RouterModule,  // Đảm bảo RouterModule đã được import
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // New way
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
