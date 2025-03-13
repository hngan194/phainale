import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';  // Import BlogService
@Component({
  selector: 'app-blogedit',
  standalone: false,
  templateUrl: './blogedit.component.html',
  styleUrl: './blogedit.component.css'
})
export class BlogEditComponent implements OnInit {
  newBlog: any = { title: '', author: '', content: '', images: [] };  // Dữ liệu blog

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // Các nút định dạng
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // Tiêu đề
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // Danh sách
      [{ 'script': 'sub'}, { 'script': 'super' }],      // Chỉ số trên/dưới
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // Thụt lề
      [{ 'size': ['small', false, 'large', 'huge'] }],  // Cỡ chữ
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // Xóa định dạng
    ]
  };
  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id'); // Lấy ID từ URL

    if (blogId) {
      this.blogService.getBlogById(blogId).subscribe((blog: any) => {
        this.newBlog = blog;  // Điền dữ liệu blog vào form
      });
    }
  }

  // Phương thức xử lý khi người dùng nhập URL hình ảnh
  onUrlChange(url: string): void {
    if (url && !this.newBlog.images.includes(url)) {
      this.newBlog.images.push(url);  // Thêm URL vào mảng images
    }
  }

  // Phương thức xóa URL hình ảnh
  removeImage(imageIndex: number): void {
    this.newBlog.images.splice(imageIndex, 1);  // Xóa hình ảnh tại vị trí chỉ định trong mảng
  }

  // Phương thức gửi dữ liệu chỉnh sửa bài blog
  onSubmit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    const formData = new FormData();

    // Thêm các dữ liệu bài blog vào FormData
    formData.append('title', this.newBlog.title);
    formData.append('author', this.newBlog.author);
    formData.append('content', this.newBlog.content);

    // Chỉ thêm URL vào FormData
    this.newBlog.images.forEach((image: string) => {
      formData.append('images', image);  // Thêm URL vào FormData
    });

    if (blogId) {
      this.blogService.updateBlog(blogId, formData).subscribe(
        (response) => {
          console.log('Blog updated successfully:', response);
          this.router.navigate(['/blog']);
        },
        (error) => {
          console.error('There was an error!', error);
          alert('Error updating blog');
        }
      );
    }
  }
}