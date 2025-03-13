import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Đảm bảo đã import cả FormsModule và ReactiveFormsModule
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';  // Đảm bảo import đúng BlogComponent
import { AppRoutingModule } from './app-routing.module';  // Đảm bảo đã import AppRoutingModule
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';  // Đảm bảo khai báo DashboardComponent
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogAddComponent } from './components/blogadd/blogadd.component';
import { QuillModule } from 'ngx-quill';
import { BlogEditComponent } from './components/blogedit/blogedit.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RoleManagementComponent,
    DashboardComponent,  // Đảm bảo khai báo DashboardComponent
    BlogAddComponent,
    BlogEditComponent,
    // Các component khác
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Đảm bảo FormsModule được import
    ReactiveFormsModule, // Thêm ReactiveFormsModule vào imports
    AppRoutingModule,  // Đảm bảo AppRoutingModule đã được import
    RouterModule,  // Đảm bảo RouterModule đã được import
    AngularEditorModule,
    QuillModule.forRoot()
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // New way
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
