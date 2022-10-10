import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentListControlComponent } from './controls/student-list-control/student-list-control.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListControlComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
