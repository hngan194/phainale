import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _bservice: BlogService
  ) {}

  ngOnInit(): void {
    const blogId = this._activatedRoute.snapshot.paramMap.get('_id');
    if (blogId) {
      this._bservice.getBlogById(blogId).subscribe((data) => {
        this.blog = data;
      });
    }
  }
   // Hàm quay lại trang danh sách blog
   goBack(): void {
    window.history.back(); // Quay lại trang trước
  }
}
