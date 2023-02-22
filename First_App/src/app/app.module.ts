import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Header } from './Header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Test } from './test/test.component';
import { Shorten } from 'src/Shorten';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    Header,
    BodyComponent,
    FooterComponent,
    Test,
    Shorten,
    FilterPipe,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
