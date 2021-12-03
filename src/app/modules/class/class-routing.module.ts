import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/_services/auth.guard'

import { ClassComponent } from './class.component'
import { CreateClassComponent } from './create/class/create-class.component'
import { ClassDocumentationComponent } from './documentation/class-documentation/class-documentation.component'
import { FinderComponent } from './finder/finder.component'
import { OverviewClassComponent } from './overview/class/overview-class.component'


const routes: Routes = [
  {
    path: '',
    component: ClassComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: ['Librarian','SuperAdmin','Admin','Student','Volunteer'],
    },
    children: [
     
      {
        path: 'overview',
        component: OverviewClassComponent,
      },
      {
        path: 'documentation',
        component: ClassDocumentationComponent,
      },
      {
        path: 'files',
        component: FinderComponent,
      },
      {
        path: 'add-class',
        component: CreateClassComponent,
      },
   
      { path: '', redirectTo: 'documentation', pathMatch: 'full' },
      { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule {}
