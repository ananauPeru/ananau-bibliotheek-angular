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
import { DeployComponent } from './getting-started/deploy/deploy.component'
import { W1ProjectsComponent } from './website/w1-projects/w1-projects.component'
import { W2TeamMembersComponent } from './website/w2-team-members/w2-team-members.component'
import { W3InvolvedCountriesComponent } from './website/w3-involved-countries/w3-involved-countries.component'
import { AutomaticEmailsComponent } from './automatic-emails/automatic-emails.component'


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
        path: 'website/1-projects',
        component: W1ProjectsComponent,
      },
      {
        path: 'website/2-team-members',
        component: W2TeamMembersComponent,
      },
      {
        path: 'website/3-involved-countries',
        component: W3InvolvedCountriesComponent,
      },
      {
        path: 'automatic-emails',
        component: AutomaticEmailsComponent,
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
export class ITDocumentationRoutingModule { }
