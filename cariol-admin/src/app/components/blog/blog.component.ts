import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service'

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  res : any 
  data : any

  _id = ''
  title = ''
  content = ''
  image = ''
  accountId = ''

  blog = {
    title : '',
    content : '',
    image : '',
    accountId : ''
  }

  constructor(private blogService : BlogService) { }

  ngOnInit(): void {

    this._id = ''
    this.title = ''
    this.content = ''
    this.image = ''
    this.accountId = ''

    this.blog = {
      title : '',
      content : '',
      image : '',
      accountId : ''
    }

    this.getBlogs()
  } 

  getBlogs(){
    this.blogService.getBlogs().subscribe(
      res => {
        this.res = res
        this.data = this.res.data
      },
      err => console.log(err)
    )
  }

  getBlog(id : any){
    this.blogService.getBlog(id).subscribe(
      res => {
        this.blog = res.data
      },
      err => console.log(err)
    )
  }

  createBlog(){

    this.blog = {
      title : this.title,
      content : this.content,
      image : this.image,
      accountId : this.accountId
    }

    this.blogService.addBlog(this.blog).subscribe(
      res => {
        this.ngOnInit()
      },
      err => console.log(err)
    )
  }

  editBlog(blog : any){
    this._id = blog._id
    this.title = blog.title
    this.content = blog.content
    this.image = blog.image
    this.accountId = blog.accountId
    }

  updateBlog(){

    this.blog = {
      title : this.title,
      content : this.content,
      image : this.image,
      accountId : this.accountId
    }

    this.blogService.updateBlog(this._id, this.blog).subscribe(
      res => {
        this.ngOnInit()
      },
      err => console.log(err)
    )
  }

  deleteBlog(blog : any){
    if(window.confirm('Are you sure you want to delete this blog?')){
      this.blogService.deleteBlog(blog).subscribe(
        res => {
          this.ngOnInit()
        },
        err => console.log(err)
      )
    }
  }
}
