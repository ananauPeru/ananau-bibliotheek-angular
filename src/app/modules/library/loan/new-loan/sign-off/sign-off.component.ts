import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserModel } from 'src/app/modules/auth'
import { LoanedPieceModel } from '../../../_models/loaned-piece.model'

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss'],
})
export class SignOffComponent implements OnInit {
  @Input() loanedPiece: LoanedPieceModel = new LoanedPieceModel()
  @Input() loaningUser: UserModel = null
  @Input() loanForm: FormGroup

  constructor() {}

  ngOnInit(): void {}

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.loanForm.controls[controlName]
    return control.valid && (control.dirty || control.touched)
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loanForm.controls[controlName]
    return control.invalid && (control.dirty || control.touched)
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.loanForm.controls[controlName]
    return control.hasError(validation) && (control.dirty || control.touched)
  }

  isControlTouched(controlName: string): boolean {
    const control = this.loanForm.controls[controlName]
    return control.dirty || control.touched
  }
}
