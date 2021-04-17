import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from "../modules/auth/_services/auth.guard";
import { LayoutComponent } from './_layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => {
          console.log('dashboard')
          return import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          )
        },
      },
      {
        path: "library",
        loadChildren: () =>
          import('../modules/library/library.module').then(
            (m) => m.LibraryModule,
          ),
      },
      {
        path: "organization",
        loadChildren: () =>
          import('../modules/organization/organization.module').then(
            (m) => m.OrganizationModule,
          ),
      },
      {
        path: 'registration-form',
        loadChildren: () =>
          import('../modules/registration-form/registration-form.module').then(
            (m) => {
              console.log("---------- WE'RE HERE!! --------")
              return m.RegistrationFormModule
            },
          ),
      },
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
