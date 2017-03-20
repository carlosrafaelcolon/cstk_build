 import { Routes, RouterModule } from '@angular/router';
 import {
     LibraryComponent,
     AboutLibComponent,
     PublicationsComponent,
     PubComponent
 } from './index'

 
 const libraryRoutes: Routes = [
   { 
       path: '', 
       component: LibraryComponent,
       children: [
           { 
                    path: '',  
                    component: AboutLibComponent
            },
            { 
                path: 'publications', 
                component: PublicationsComponent
            },
            { 
                path: 'publications/:pubId', 
                component: PubComponent
            }
      
       ]
    },
 ];
 
export const libraryRouting = RouterModule.forChild(libraryRoutes);
