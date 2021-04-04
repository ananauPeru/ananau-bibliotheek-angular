import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './modules/auth/_services/auth.guard'

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => {
      console.log('route auth')
      return import('./modules/auth/auth.module').then((m) => m.AuthModule)
    },
  },
  {
    path: 'error',
    loadChildren: () => {
      console.log('route auth')
      return import('./modules/errors/errors.module').then(
        (m) => m.ErrorsModule,
      )
    },
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => {
      console.log('route auth')
      return import('./pages/layout.module').then((m) => m.LayoutModule)
    },
  },
  { path: '**', redirectTo: 'error/404' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
