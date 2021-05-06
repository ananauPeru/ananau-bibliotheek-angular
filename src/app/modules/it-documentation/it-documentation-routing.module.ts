import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/_services/auth.guard'
import { S0PreparationsComponent } from './getting-started/s0-preparations/s0-preparations.component'
import { S1SettingUpComponent } from './getting-started/s1-setting-up/s1-setting-up.component'
import { ITDocumentationComponent } from './it-documentation'

const routes: Routes = [
  {
    path: '',
    component: ITDocumentationComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: ['SuperAdmin'],
    },
    children: [
      {
        path: 'getting-started/0-preparations',
        component: S0PreparationsComponent,
      },
      {
        path: 'getting-started/1-setting-up',
        component: S1SettingUpComponent,
      },
      // {
      //   path: 'books/add-book',
      //   component: CreateBookComponent,
      // },
      // {
      //   path: 'books/edit-book/:id',
      //   resolve: { book: BookResolver },
      //   component: CreateBookComponent,
      // },
      // {
      //   path: 'items/overview',
      //   component: OverviewItemComponent,
      // },
      // {
      //   path: 'items/add-item',
      //   component: CreateItemComponent,
      // },
      // {
      //   path: 'items/edit-item/:id',
      //   resolve: { item: ItemResolver },
      //   component: CreateItemComponent,
      // },
      // {
      //   path: 'loans/overview',
      //   component: OverviewComponent,
      // },
      // {
      //   path: 'loans/new-loan',
      //   component: AddLoanComponent,
      // },
      // {
      //   path: 'loans/edit-loan/:id',
      //   resolve: { loan: LoanedPieceResolver },
      //   component: AddLoanComponent,
      // },
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
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ITDocumentationRoutingModule {}
