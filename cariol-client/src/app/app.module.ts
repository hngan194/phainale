import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';
import { SigninAccountComponent } from './components/signin-account/signin-account.component';

// Import các Standalone Components
import { DashboardChangePasswordComponent } from './components/dashboard-change-password/dashboard-change-password.component';
import { CommonQuestionComponent } from './components/common-question/common-question.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardEditProfileComponent } from './components/dashboard-edit-profile/dashboard-edit-profile.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    AboutusComponent,
    SigninAccountComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),

    // Standalone Components - Chỉ cần import ở đây
    SidebarComponent,
    DashboardChangePasswordComponent,
    CommonQuestionComponent,
    DashboardEditProfileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
