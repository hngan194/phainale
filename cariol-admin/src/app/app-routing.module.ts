import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';  // Import BlogComponent
import { LoginComponent } from './components/login/login.component';
import {RoleManagementComponent} from'./components/role-management/role-management.component';

const routes: Routes = [
  { path: 'role-management', component: RoleManagementComponent },
  {path: 'login', component: LoginComponent},
  { path: 'blog', component: BlogComponent },  // Route cho BlogComponent
  // { path: '', redirectTo: '/blogs', pathMatch: 'full' },  // Route mặc định để hiển thị BlogComponent ngay khi vào ứng dụng
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Đảm bảo bạn sử dụng forRoot để cấu hình routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
