import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';


import { AppComponent }  from './app.component';
import { NewsService }   from './services/news.service';

@NgModule({
  imports: [ BrowserModule, HttpModule ],
  declarations: [ AppComponent ],
  providers: [ NewsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
