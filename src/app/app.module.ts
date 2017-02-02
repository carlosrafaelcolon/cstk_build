import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions} from '@angular/http';
import {SharedModule} from './shared/shared.module';
//Handling Routes
import { routing } from './app.routing';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
     }), http, options);
}

import { AppComponent } from './app.component';
import { 
  FeaturedOperationComponent,
  LandingComponent
  
}  from './landing';

import {  
  AboutComponent, 
  OrgComponent,
  PeopleComponent,
  PersonComponent,
  ContactComponent 
}  from './about';

import {  
  BlogComponent,
  PostListComponent,
  PostComponent  
}  from './blog';

import {
  OperationComponent,
  OperationLandingComponent,
  OperationsMethodologyComponent,
  NamesComponent,
  SearchComponent,
  PakistanComponent,
  YemenComponent,
  TurkeyComponent,
  IsraelComponent, 
  SomaliaComponent, 
  GlobalDetailComponent
} from './operation';

//services
import { 
  StrikeService, 
  BlogService,
  PeopleService,
  NameService,
  LibraryService,
  StatisticService,
  HelperService,
  AuthService,
  AuthGuard

 } from './shared';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FeaturedOperationComponent,
    OperationComponent,
    OperationLandingComponent,
    OperationsMethodologyComponent,
    NamesComponent,
    SearchComponent,
    PakistanComponent,
    YemenComponent,
    TurkeyComponent,
    IsraelComponent, 
    SomaliaComponent, 
    GlobalDetailComponent,
    BlogComponent,
    PostListComponent,
    PostComponent,
    AboutComponent,
    OrgComponent,
    PeopleComponent,
    PersonComponent,
    ContactComponent,
    MainNavComponent,
    MainFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    routing
  ],
  providers: [
    StrikeService, 
    BlogService,
    PeopleService,
    NameService,
    LibraryService,
    StatisticService,
    HelperService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
