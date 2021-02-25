import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistreerComponent } from './registreer/registreer.component';
import { WachtwoordvergetenComponent } from './wachtwoordvergeten/wachtwoordvergeten.component';
import { AccountWijzigenComponent } from './account-wijzigen/account-wijzigen.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistreerComponent
  },
  {
    path: 'forgot-password',
    component: WachtwoordvergetenComponent
  },
  {
    path: '',
    component: AccountWijzigenComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegistreerComponent,
    WachtwoordvergetenComponent,
    AccountWijzigenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginComponent,
    RegistreerComponent,
    WachtwoordvergetenComponent,
    AccountWijzigenComponent
  ]
})
export class AccountModule { }
