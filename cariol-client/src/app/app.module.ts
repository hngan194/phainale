import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule nếu cần
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BlogComponent } from './components/blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    BlogComponent,
    AboutusComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // Thêm CommonModule vào imports
    RouterModule.forRoot([]),// Thêm RouterModule nếu bạn sử dụng routing
    HttpClientModule,
  ],
  providers: [], // Thêm các service vào đây nếu cần
  bootstrap: [AppComponent] // Bootstrap AppComponent
})
export class AppModule { }