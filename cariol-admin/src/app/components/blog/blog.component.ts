// src/app/components/blog/blog.component.ts
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];

  constructor(public router: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  editBlog(id: string): void {
    this.router.navigate([`/blog-edit/${id}`]);  // Điều hướng đến trang chỉnh sửa
  }

  // Phương thức gọi API để xóa blog
  deleteBlog(blogId: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài blog này không?')) {
      this.blogService.deleteBlog(blogId).subscribe(
        (response) => {
          // Sau khi xóa thành công, lọc mảng blogs để loại bỏ bài blog đã xóa
          this.blogs = this.blogs.filter((blog) => blog._id !== blogId);
          alert('Xóa bài blog thành công');
        },
        (error) => {
          console.error('Có lỗi khi xóa bài blog:', error);
          alert('Xóa bài blog không thành công');
        }
      );
    }
  }
}