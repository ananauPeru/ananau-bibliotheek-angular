import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistreerComponent } from './registreer/registreer.component';
import { WachtwoordvergetenComponent } from './wachtwoordvergeten/wachtwoordvergeten.component';
import { OverviewComponent } from './overview/overview.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ItemResolver } from './resolvers/item.resolver';
import { ScanItemComponent } from './scan-item/scan-item.component';
import { AccountWijzigenComponent } from './account-wijzigen/account-wijzigen.component';
import { ItemsBeherenComponent } from './items-beheren/items-beheren.component';
import { ItemToevoegenComponent } from './item-toevoegen/item-toevoegen.component';
import { ItemWijzigenComponent } from './item-wijzigen/item-wijzigen.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'wachtwoordvergeten',
    component: WachtwoordvergetenComponent,
  },
  {
    path: 'register',
    component: RegistreerComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'itemtoevoegen',
    component: ItemToevoegenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'itemwijzigen/:id',
    component: ItemWijzigenComponent,
    resolve: { item: ItemResolver },
    canActivate: [AuthGuard],
  },
  {
    path: "item/:id",
    component: ItemPageComponent,
    resolve: { item: ItemResolver },
    canActivate: [AuthGuard],
  },
  {
    path: "scan",
    component: ScanItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "itemsbeheren",
    component: ItemsBeherenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "account",
    component: AccountWijzigenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'overview',
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
