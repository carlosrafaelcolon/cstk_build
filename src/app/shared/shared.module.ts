import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { 
  MatchHeightDirective,
  CapitalizePipe,
  FilterLibraryPipe,
  PubCountryPipe,
  SafeHtmlPipe
  } from './index';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    CapitalizePipe, 
    FilterLibraryPipe, 
    PubCountryPipe, 
    SafeHtmlPipe, 
    MatchHeightDirective
    ],
  exports: [ 
    CommonModule,
    FormsModule,
    MatchHeightDirective,
    FilterLibraryPipe, 
    CapitalizePipe,
    PubCountryPipe,
    SafeHtmlPipe,
    MaterialModule
  ],
})
export class SharedModule { }
