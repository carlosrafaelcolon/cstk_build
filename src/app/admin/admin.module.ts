import { NgModule } from '@angular/core';

import {  ReactiveFormsModule }    from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

import {UserEditGuard} from './user-edit.guard';
import {AdminGuard} from './admin.guard';

import { AdminComponent } from './admin.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { adminRouting } from './admin.routing';
import { AdminPeopleComponent } from './admin-people/admin-people.component';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { AdminOperationsComponent } from './admin-operations/admin-operations.component';
import { AdminLibraryCreateComponent } from './admin-library/admin-library-create/admin-library-create.component';
import { AdminPeopleCreateComponent } from './admin-people/admin-people-create/admin-people-create.component';
import { AdminOperationsCreateComponent } from './admin-operations/admin-operations-create/admin-operations-create.component';
import { AdminOperationsEditComponent } from './admin-operations/admin-operations-edit/admin-operations-edit.component';
import { AdminLibraryEditComponent } from './admin-library/admin-library-edit/admin-library-edit.component';
import { AdminPeopleEditComponent } from './admin-people/admin-people-edit/admin-people-edit.component';
import{
  TagsComponent,
  SourcesComponent,
  WeaponTypesComponent
} from  './index';

import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminPostEditComponent} from './admin-blog';
import { AdminPostCreateComponent } from './admin-blog/admin-post-create/admin-post-create.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { IdComponent } from './id/id.component';



@NgModule({
  imports: [
    ReactiveFormsModule,

    adminRouting,

    SharedModule
    
  ],
  declarations: [
    AdminComponent, 
    AdminLandingComponent, 
    AdminPeopleComponent, 
    AdminLibraryComponent, 
    AdminOperationsComponent, 
    AdminLibraryCreateComponent, 
    AdminPeopleCreateComponent, 
    AdminOperationsCreateComponent, 
    AdminOperationsEditComponent, 
    AdminLibraryEditComponent, 
    AdminPeopleEditComponent, 
    TagsComponent, 
    SourcesComponent, 
    WeaponTypesComponent, 
    AdminBlogComponent, 
    AdminPostEditComponent, 
    AdminPostCreateComponent, 
    TutorialComponent, 
    UnauthorizedComponent, IdComponent
    ],
  providers: [
   UserEditGuard,
   AdminGuard
  ]

})
export class AdminModule { }
