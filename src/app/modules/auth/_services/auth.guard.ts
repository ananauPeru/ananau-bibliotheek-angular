import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthUtil } from 'src/app/_utils/auth_util'
import { ToastrUtil } from 'src/app/_utils/toastr_util'
import { AuthService } from './auth.service'


@Injectable({ providedIn: 'root' })
export class AuthGuard extends AuthUtil implements CanActivate {

  public toastrUtil;

  constructor(private router: Router, private authService: AuthService, toastrUtil:ToastrUtil) {
    super()
    this.toastrUtil = toastrUtil;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue
    if (currentUser) {
      console.log('== LOGGED IN AUTH GUARD')
      let roles = route.data['permittedRoles'] as Array<string>
      if (roles) {
        if (this.permitted(roles)) {
          console.log("Returning from auth guard true")
          return true
        } else {
          console.log("Returning from auth guard false")
          this.toastrUtil.showWarning("You are not authorized to do that... Contact the organization.","Unauthorized")
          return false
        }
      }
      return true
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout()
    return false
  }
}
