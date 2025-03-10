import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];
  selectedCode: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _bservice: BlogService
  ) {}

  ngOnInit() {
    // Lấy tất cả các blog từ BlogService
    this._bservice.getBlogs().subscribe({
      next: (data) => { 
        this.blogs = data;
        
        // Nếu có _id từ URL, chọn blog tương ứng
        if (this.selectedCode) {
          this.selectBlogById(this.selectedCode);
        }
      },
      error: (err) => { console.log(err); }
    });

    // Lấy _id từ URL (nếu có) khi trang được tải
    this._activatedRoute.paramMap.subscribe((params) => {
      let code = params.get("_id");
      if (code != null) {
        this.selectedCode = code;
        // Lọc blog tương ứng khi có _id từ URL
        this.selectBlogById(code);
      }
    });
  }

  // Hàm để lọc và chọn blog theo ID
  selectBlogById(id: any) {
    const selectedBlog = this.blogs.find(blog => blog._id === id);
    if (selectedBlog) {
      console.log("Selected Blog:", selectedBlog);
    }
  }

  // Hàm chuyển hướng đến chi tiết của một bài viết
  someFunction(blog: any): void {
    this._router.navigate(["/blogs", blog._id]);
  }
}
