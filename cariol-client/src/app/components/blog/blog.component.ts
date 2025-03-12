
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';  // Import BlogService
import { Router } from '@angular/router';  // Import Router


@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];  // Mảng để lưu danh sách các blog


  constructor(private blogService: BlogService, private router: Router) { }


  ngOnInit(): void {
    // Gọi hàm getBlogs() để lấy danh sách blog
    this.blogService.getBlogs().subscribe(
      (data: any[]) => {
        this.blogs = data;  // Lưu dữ liệu vào mảng blogs
      },
      error => {
        console.error("Có lỗi khi lấy dữ liệu blog:", error);
      }
    );
  }


  // Hàm xử lý khi click vào một bài blog
  onBlogClick(blogId: string): void {
    this.router.navigate(['/blog-detail', blogId]);  // Điều hướng đến blog detail với blogId
  }
}



