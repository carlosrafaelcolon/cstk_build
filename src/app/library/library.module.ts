import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {libraryRouting} from './library.routing';
import {
  LibraryComponent,
  AboutLibComponent,
  PublicationsComponent,
  PubComponent
} from './index';



@NgModule({
  imports: [
    FormsModule,
    libraryRouting,
    SharedModule
  ],
  declarations: [
    LibraryComponent,
    AboutLibComponent,
    PublicationsComponent,
    PubComponent
  ]
})
export class LibraryModule { }
