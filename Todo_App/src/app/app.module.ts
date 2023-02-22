import { FilterPipe } from './../../../Angular-basic/src/app/filter.pipe';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { SampleComponent } from './sample/sample.component';
import { ReverseStringPipe } from './reverse-string.pipe';
import { CustompipePipe } from './custompipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SampleComponent,
    ReverseStringPipe,
    CustompipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
