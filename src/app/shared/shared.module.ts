import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { 
  MatchHeightDirective,
  CapitalizePipe,
  FilterLibraryPipe,
  PubCountryPipe,
  DatexPipe,
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
    MatchHeightDirective, 
    DatexPipe
    ],
  exports: [ 
    CommonModule,
    FormsModule,
    MatchHeightDirective,
    FilterLibraryPipe, 
    CapitalizePipe,
    PubCountryPipe,
    SafeHtmlPipe,
    DatexPipe,
    MaterialModule
  ],
})
export class SharedModule { }
