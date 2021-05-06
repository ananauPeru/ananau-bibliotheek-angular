import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LogoutComponent } from './logout/logout.component'
import { AuthComponent } from './auth.component'
import { TranslationModule } from '../i18n/translation.module'
import { LayoutModule } from 'src/app/pages/layout.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { httpInterceptorProviders } from 'src/app/http-interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component'


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    ResetPasswordComponent,
  ],
  // providers: [httpInterceptorProviders],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,    
    NgbModule,    
  ],
})
export class AuthModule {}
