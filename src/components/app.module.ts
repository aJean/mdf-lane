import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import ConsoleComponent from './console.component';

/**
 * @file app module
 */

@NgModule({
  declarations: [ConsoleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [ConsoleComponent]
})
export default class AppModule {}
