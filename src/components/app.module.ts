import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import ConsoleComponent from './console.component';

/**
 * @file app module
 */

@NgModule({
  declarations: [ConsoleComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [ConsoleComponent]
})
export default class AppModule {}
