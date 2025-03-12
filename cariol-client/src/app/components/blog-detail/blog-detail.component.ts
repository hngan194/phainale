import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-blog-detail',
  standalone: false,
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId!: string;  // Thêm dấu "!" để báo với TypeScript rằng biến này sẽ được gán giá trị


  blog: any = null;


  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id') || '';  // Gán giá trị từ URL
    this.getBlogDetail(this.blogId);
  }


  getBlogDetail(id: string): void {
    this.http.get('http://localhost:3002/blogs/' + id)
      .subscribe(response => {
        this.blog = response;
      }, error => {
        console.error('Error fetching blog details:', error);
      });
  }
}
