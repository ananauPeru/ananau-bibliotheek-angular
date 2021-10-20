import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/_services/auth.guard'
import { CreateBookComponent } from './create/book/create-book.component'
import { CreateItemComponent } from './create/item/create-item.component'
import { CreateClassComponent } from './create/class/create-class.component'
import { LibraryComponent } from './library.component'
import { AddLoanComponent } from './loan/new-loan/add-loan.component'
import { OverviewComponent } from './loan/overview/overview.component'
import { OverviewBookComponent } from './overview/book/overview-book.component'
import { OverviewItemComponent } from './overview/item/overview-item.component'
import { OverviewClassComponent } from './overview/class/overview-class.component'
import { BookResolver } from './_resolvers/book.resolver'
import { ItemResolver } from './_resolvers/item.resolver'
import { LoanedPieceResolver } from './_resolvers/loaned-piece.resolver'


const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: ['Librarian','SuperAdmin'],
    },
    children: [
      {
        path: 'books/overview',
        component: OverviewBookComponent,
      },
      {
        path: 'books/add-book',
        component: CreateBookComponent,
      },
      {
        path: 'classes/overview',
        component: OverviewClassComponent,
      },
      {
        path: 'classes/add-class',
        component: CreateClassComponent,
      },
      {
        path: 'books/edit-book/:id',
        resolve: { book: BookResolver },
        component: CreateBookComponent,
      },
      {
        path: 'items/overview',
        component: OverviewItemComponent,
      },
      {
        path: 'items/add-item',
        component: CreateItemComponent,
      },
      {
        path: 'items/edit-item/:id',
        resolve: { item: ItemResolver },
        component: CreateItemComponent,
      },
      {
        path: 'loans/overview',
        component: OverviewComponent,
      },
      {
        path: 'loans/new-loan',
        component: AddLoanComponent,
      },
      {
        path: 'loans/edit-loan/:id',
        resolve: { loan: LoanedPieceResolver },
        component: AddLoanComponent,
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
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
