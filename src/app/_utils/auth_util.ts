import { AuthModel } from '../modules/auth/_models/auth.model' 
import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: "root",
})
export class AuthUtil {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`

  private getAuthFromLocalStorage(): AuthModel {
    try {
      // console.log(localStorage)
      // console.log(this.authLocalStorageToken)
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken),
      )
      // console.log(authData)
      return authData
    } catch (error) {
      // console.error(error)
      return undefined
    }
  }

  permitted(allowedRoles): boolean {
    var payLoad = this.getAuthFromLocalStorage().roles
    var b = false
    payLoad = payLoad.map((r) => r.toLowerCase())
    console.log(payLoad)
    allowedRoles.forEach((element) => {
      console.log(element.toLowerCase())
      if (payLoad.indexOf(element.toLowerCase()) > -1) {
        console.log('returning true')
        b = true
      }
    })
    return b
  }
}
