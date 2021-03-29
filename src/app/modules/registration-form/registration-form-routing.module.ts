import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ContainerComponent } from './container/container.component'
import { FormRole } from './models/form-role'
import { RegistrationFormComponent } from './registration-form.component'

// const routes: Routes = [
//     {
//       path: 'student',
//       component: ContainerComponent,
//       data: {
//         role: FormRole.STUDENT,
//       },
//     },
//     {
//       path: 'volunteer',
//       component: ContainerComponent,
//       data: {
//         role: FormRole.VOLUNTEER,
//       },
//     },
//     {
//       path: '',
//       component: ContainerComponent,
//       data: {
//         role: FormRole.VOLUNTEER,
//       },
//     },
//   ]

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
    children: [
      {
        path: 'student',
        component: ContainerComponent,
        data: {
          role: FormRole.STUDENT,
        },
      },
      {
        path: 'volunteer',
        component: ContainerComponent,
        data: {
          role: FormRole.VOLUNTEER,
        },
      },
      {
        path: '',
        component: ContainerComponent,
        data: {
          role: FormRole.VOLUNTEER,
        },
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationFormRoutingModule {}
