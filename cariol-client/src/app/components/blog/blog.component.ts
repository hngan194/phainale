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
    this._bservice.getBlogs().subscribe({
      next: (data) => { this.blogs = data; },
      error: (err) => { console.log(err); }
    });

    this._activatedRoute.paramMap.subscribe((params) => {
      let code = params.get("_id");
      if (code != null) {
        this.selectedCode = code;
      }
    });
  }

  someFunction(blog: any): void {
    this._router.navigate(["/blogs", blog._id]);
  }
}