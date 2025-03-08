import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  _url = 'http://localhost:3000/api/blog'

  constructor( private _http: HttpClient) { }

  getBlogs() {
    return this._http.get<any>(this._url)
  }

  getBlog(id: any) {
    return this._http.get<any>(this._url + '/' + id)
  }

  addBlog(blog: any) {
    return this._http.post<any>(this._url, blog)
  }

  updateBlog(id : any, blog: any) {
    return this._http.put<any>(this._url + '/' + id, blog)
  }

  deleteBlog(blog: any) {
    return this._http.delete<any>(this._url + '/' + blog._id)
  }

}
