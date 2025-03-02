import { Component } from '@angular/core';
import { AboutusComponent } from './components/aboutus/aboutus.component';

@Component({
  standalone: true, // Dùng standalone
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AboutusComponent] // Import AboutusComponent vào đây
})
export class AppComponent { }
