import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { CommonQuestionComponent } from './components/common-question/common-question.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes : Routes = [
  { path: "aboutus", component: AboutusComponent },
  { path: "blog", component: BlogComponent},
  { path: '', component: HomepageComponent }, // Trang chủ
  { path: 'common-question', component: CommonQuestionComponent},
  { path: 'product/:id', component: ProductDetailsComponent }, // Chi tiết sản phẩm
  { path: 'order', component: OrderComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: 'blog/:id', component: BlogComponent},
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'change-password', component: ChangePasswordComponent },

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