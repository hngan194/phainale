import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';

const routes : Routes = [
  { path: "aboutus", component: AboutusComponent },
  { path: "blog", component: BlogComponent}
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