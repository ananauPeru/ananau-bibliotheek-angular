import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/_services/auth.guard'
import { CreateComponent } from './create/create.component'
import { LibraryComponent } from './library.component'
import { OverviewBookComponent } from './overview/book/overview-book.component'
import { OverviewItemComponent } from './overview/item/overview-item.component'

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: ['Admin', 'SuperAdmin'],
    },
    children: [
      {
        path: 'books/overview',
        component: OverviewBookComponent,
      },
      {
        path: 'books/add-book',
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
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
