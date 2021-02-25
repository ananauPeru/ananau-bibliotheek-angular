import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'library',
    canActivate: [AuthGuard],
    loadChildren: () => import('./library/library.module').then(
      mod => mod.LibraryModule
    )
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(
      mod => mod.AccountModule
    )
  },
  {
    path: '',
    redirectTo: 'library/overview',
    pathMatch: "full"
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
