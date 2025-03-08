import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';
import { DashboardChangePasswordComponent } from './components/dashboard-change-password/dashboard-change-password.component';
import { SigninAccountComponent } from './components/signin-account/signin-account.component';
import { EditProfileComponent } from './components/dashboard-edit-profile/dashboard-edit-profile.component';
import { ChangePasswordComponent } from './components/_services/change-password.service';

const routes : Routes = [
  { path: "aboutus", component: AboutusComponent },
  { path: "blog", component: BlogComponent},
  { path: "dashboard-change-password", component:DashboardChangePasswordComponent }
  { path: 'signin-account', component: SigninAccountComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '', redirectTo: '/signin-account', pathMatch: 'full' }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }