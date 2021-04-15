import { AuthModel } from '../modules/auth/_models/auth.model'
import { environment } from 'src/environments/environment'
import { IndividualConfig, ToastrService } from 'ngx-toastr'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ToastrUtil {
  constructor(private toastr: ToastrService) {}

  individualConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-bottom-right',
  }

  public showSuccess(message, title) {
    // this.toastr.opt
    this.toastr.success(message, title, this.individualConfig)
  }

  public showError(message, title) {
    this.toastr.error(message, title, this.individualConfig)
  }

  public showInfo(message, title) {
    this.toastr.info(message, title, this.individualConfig)
  }

  public showWarning(message, title) {
    this.toastr.warning(message, title, this.individualConfig)
  }
}
