import { Routes, RouterModule } from '@angular/router';
import {UserEditGuard} from './user-edit.guard';
import {AdminGuard} from './admin.guard';
import { AuthGuard}                from '../shared';
import {
    AdminComponent,
    AdminLandingComponent,
    AdminPeopleComponent,
    AdminPeopleCreateComponent,
    AdminPeopleEditComponent,
    AdminLibraryComponent,
    AdminLibraryCreateComponent,
    AdminLibraryEditComponent,
    AdminOperationsComponent,
    AdminOperationsCreateComponent,
    AdminOperationsEditComponent,
    AdminBlogComponent,
    AdminPostCreateComponent,
    AdminPostEditComponent,
    IdComponent,
    UnauthorizedComponent
  
} from './index';
import {TutorialComponent} from './tutorial/tutorial.component';
// import {
//         PeopleListComponent,
//         PeopleCreateComponent,
//         PeopleEditDetailComponent
//          } from './people';

// import { 
//         PublicationListComponent,
//         PublicationCreateComponent,
//         PublicationEditDetailComponent
//  } from './library';


const adminRoutes: Routes = [
        { 
            path: '', 
            component:  AdminComponent,
            canActivate: [AuthGuard],
            children: [
                { 
                        path: '',  
                        component: AdminLandingComponent,
                        canActivateChild: [AuthGuard],
                },
                { 
                    path: 'people',  
                    component: AdminPeopleComponent,
                    canActivate: [AdminGuard]
                },
                { 
                    path: 'people/create',  
                    component: AdminPeopleCreateComponent,
                    canDeactivate: [UserEditGuard]
                },
                { 
                    path: 'people/edit/:staffId',  
                    component: AdminPeopleEditComponent,
                    canDeactivate: [UserEditGuard]
                },
                { 
                    path: 'library',  
                    component: AdminLibraryComponent
                },
                { 
                    path: 'library/create',  
                    component: AdminLibraryCreateComponent,
                    canDeactivate: [UserEditGuard]
                },
                { 
                    path: 'library/edit/:pubId',  
                    component: AdminLibraryEditComponent,
                    canDeactivate: [UserEditGuard]
                },
                {
                    path: 'operations',  
                    component: AdminOperationsComponent
                },
                {
                    path: 'operations/create',  
                    component: AdminOperationsCreateComponent,
                    canDeactivate: [UserEditGuard]
                },
                {
                    path: 'operations/edit/:strikeId',  
                    component:  AdminOperationsEditComponent,
                    canDeactivate: [UserEditGuard]
                },
                {
                    path: 'blog',  
                    component: AdminBlogComponent,
                    canActivate: [AdminGuard]
                },
                 {
                    path: 'blog/post/create',  
                    component: AdminPostCreateComponent,
                    canDeactivate: [UserEditGuard]
                },
                {
                    path: 'blog/post/edit/:slug',  
                    component:  AdminPostEditComponent,
                    canDeactivate: [UserEditGuard]
                },
                {
                    path: 'tutorial',  
                    component:  TutorialComponent
                },
                {
                    path: 'indentification',  
                    component:  IdComponent
                },
                {
                    path: 'unauthorized',  
                    component:  UnauthorizedComponent
                }
                
                
            ]
        }
];

export const adminRouting = RouterModule.forChild(adminRoutes);
