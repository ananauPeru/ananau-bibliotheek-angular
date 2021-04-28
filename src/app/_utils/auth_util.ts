import { AuthModel } from "../modules/auth/_models/auth.model";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { ToastrUtil } from "./toastr_util";

@Injectable({
  providedIn: "root",
})
export class AuthUtil {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      return undefined;
    }
  }

  permitted(allowedRoles): boolean {
    var payLoad = this.getAuthFromLocalStorage().roles;
    var b = false;
    payLoad = payLoad.map((r) => r.toLowerCase());
    allowedRoles.forEach((element) => {
      if (payLoad.indexOf(element.toLowerCase()) > -1) {
        b = true;
      }
    });
    // if (!b) {
    //   this.toastrUtil.showWarning(
    //     'You are not permitted to do this...',
    //     'Unauthorized',
    //   )
    // }
    return b;
  }
}
