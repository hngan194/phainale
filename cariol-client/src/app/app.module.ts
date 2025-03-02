import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component'; // Import AboutusComponent

@NgModule({
  imports: [BrowserModule, AboutusComponent], // Import thay vì declarations
  bootstrap: [AppComponent]
})
export class AppModule { }
