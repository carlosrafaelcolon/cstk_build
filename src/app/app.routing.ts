import { Routes, RouterModule } from '@angular/router';
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
import { AuthGuard}                from './shared';
const appRoutes: Routes = [
    { 
    path: '', 
    component:  LandingComponent
  },
  { 
    path: 'operations', 
    component:  OperationComponent,
    children: [
        { path: '', component:  OperationLandingComponent},
        { path: 'featured/:strikeId', component: FeaturedOperationComponent},
        { path: 'methodology', component:  OperationsMethodologyComponent},
        { path: 'names', component:  NamesComponent},
        { path: 'search', component: SearchComponent},

        { path: 'pakistan', component: PakistanComponent},

        { path: 'yemen', component: YemenComponent},
  
        { path: 'turkey', component: TurkeyComponent},

        { path: 'israel', component: IsraelComponent},

        { path: 'somalia', component: SomaliaComponent},

        { path: 'incident/:strikeId', component: GlobalDetailComponent}
    ]
  },
  { 
    path: 'library', 
    loadChildren: 'app/library/library.module#LibraryModule',
  },
  { 
    path: 'blog', 
    component:  BlogComponent,
    children:[
      {
        path: '', 
        component:PostListComponent
      },
      {
        path: 'post/:slug', 
        component:  PostComponent,
      }
    ]
  },
  { 
    path: 'about', 
    component:  AboutComponent,
    children: [
        { path: '', component:  OrgComponent},
        { path: 'people', component: PeopleComponent},
        { path: 'people/:slug', component: PersonComponent},
        { path: 'contact', component: ContactComponent}

    ]
  },
  { 
    path: 'admin', 
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(appRoutes);