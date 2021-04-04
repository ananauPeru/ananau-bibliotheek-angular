import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CreateComponent } from './create/create.component';
import { LibraryComponent } from './library.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,   
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'add-item',
        component: CreateComponent,
      },
      // {
      //   path: 'registration',
      //   component: RegistrationComponent
      // },
      // {
      //   path: 'forgot-password',
      //   component: ForgotPasswordComponent
      // },
      // {
      //   path: 'logout',
      //   component: LogoutComponent
      // },
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LibraryRoutingModule {}
