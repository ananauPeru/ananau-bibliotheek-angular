import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/_services/auth.guard'
import { OrganizationComponent } from './organization.component'
import { RolesComponent } from './roles/roles.component'

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: ['Admin', 'SuperAdmin'],
    },
    children: [
      {
        path: 'roles',
        component: RolesComponent,
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
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
