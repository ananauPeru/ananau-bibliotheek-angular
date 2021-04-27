import { DatePipe } from '@angular/common'
import { Token } from '@angular/compiler/src/ml_parser/lexer'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable'
import { UserModel } from 'src/app/modules/auth'
import { BookModel } from '../../../_models/book.model'
import { LoanedPieceModel } from '../../../_models/loaned-piece.model'
import { BookService } from '../../../_services/book/book.service'
import { ItemService } from '../../../_services/item/item.service'
import { LoanService } from '../../../_services/loan/loan.service'
import { UserService } from '../../../_services/user/user.service'

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit {
  public filteredItems = null
  public type = 'Books'
  public item = null
  public loanedPiece: LoanedPieceModel = null
  public loaningUser: UserModel = null
  public filter = this.item ? this.item.name : ''
  public userFilter = this.loaningUser ? this.loaningUser.email : ''

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    public loanService: LoanService,
    public bookService: BookService,
    public itemService: ItemService,
    public userService: UserService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    console.log(this.datePipe.transform(Date.now(), 'yyyy-MM-dd'))
    this.formGroup = this.fb.group({
      loaningUser: [
        this.loanedPiece && this.loanedPiece.loaningUser
          ? this.loanedPiece.loaningUser.id
          : '',
        Validators.compose([Validators.required]),
      ],
      loanDate: [
        this.loanedPiece && this.loanedPiece.loanDate
          ? this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
          : new NgbDate(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate(),
            ),
        Validators.compose([Validators.required]),
      ],
      returnDate: [
        this.loanedPiece && this.loanedPiece.returnDate
          ? this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
          : new NgbDate(
              new Date(Date.now() + 12096e5).getFullYear(),
              new Date(Date.now() + 12096e5).getMonth() + 1,
              new Date(Date.now() + 12096e5).getDate(),
            ),
        Validators.compose([Validators.required]),
      ],
      state: [
        this.loanedPiece && this.loanedPiece.loanState
          ? this.loanedPiece.loanState
          : 'Good',
        Validators.compose([Validators.required]),
      ],
      quantity: [
        this.loanedPiece && this.loanedPiece.quantity
          ? this.loanedPiece.quantity
          : 1,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
        ]),
      ],
    })
  }

  filteredList(): Observable<any[]> {
    if (this.type.toLowerCase() == 'books') {
      this.bookService.filter(this.filter, undefined, undefined)
      return this.bookService.books
    } else {
      this.itemService.filter(this.filter, undefined, undefined)
      return this.itemService.items
    }
  }

  filteredUserList(): Observable<UserModel[]> {
    this.userService.filter(this.userFilter)
    return this.userService.users
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    return control.valid && (control.dirty || control.touched)
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    return control.invalid && (control.dirty || control.touched)
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName]
    return control.hasError(validation) && (control.dirty || control.touched)
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    return control.dirty || control.touched
  }
}
