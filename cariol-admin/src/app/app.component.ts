import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cariol-admin';

  checkLogin(){
    if(localStorage.getItem('token')){
      return true
    }
    return false
  }
}
