import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../auth/_services/auth.guard'
import { S0PreparationsComponent } from './getting-started/s0-preparations/s0-preparations.component'
import { S1SettingUpComponent } from './getting-started/s1-setting-up/s1-setting-up.component'
import { ModelsAndTablesComponent } from './getting-started/s2-best-practices/models-and-tables/models-and-tables.component'
import { ITDocumentationComponent } from './it-documentation'
import { PostsComponent } from './posts/posts.component'
import { CreateComponent } from './todos/create/create.component'
import { ToDosComponent } from './todos/todos.component'
import { TodoResolver } from './_resolvers/todo.resolver'
import { DeployComponent } from './deploy/deploy.component'

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
      {
        path: 'getting-started/2-best-practices/models-and-tables',
        component: ModelsAndTablesComponent,
      },
      {
        path: 'getting-started/3-deployment-azure',
        component: DeployComponent,
      },
      {
        path: 'todos',
        component: ToDosComponent,
      },
      {
        path: 'todos/create',
        component: CreateComponent,
      },
      {
        path: 'todos/create/:id',
        resolve: { todo: TodoResolver },
        component: CreateComponent,
      },
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
