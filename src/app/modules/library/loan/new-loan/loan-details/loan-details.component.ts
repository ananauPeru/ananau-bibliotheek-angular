import { DatePipe } from '@angular/common'
import { Token } from '@angular/compiler/src/ml_parser/lexer'
import { Component, Input, OnInit } from '@angular/core'
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
  @Input() loanedPiece: LoanedPieceModel = new LoanedPieceModel()
  @Input() loaningUser: UserModel = null
  @Input() loanForm: FormGroup

  public filteredItems = null
  public type = 'Books'
  public item = null
  public filter = this.item ? this.item.name : ''
  public userFilter = this.loaningUser ? this.loaningUser.email : ''

  constructor(
    public loanService: LoanService,
    public bookService: BookService,
    public itemService: ItemService,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    if (this.loanedPiece.book) {
      this.type = 'Books'
      this.item = this.loanedPiece.book
    } else if (this.loanedPiece.item) {
      this.type = 'Items'
      this.item = this.loanedPiece.item
    }
  }

  setItem(i: any) {
    this.item = i
    if (this.type.toLowerCase() == 'books') {
      this.loanedPiece.book = this.item
      this.loanedPiece.item = null
    } else {
      this.loanedPiece.book = null
      this.loanedPiece.item = this.item
    }
  }

  setUser(u: any) {
    this.loaningUser = u
    this.loanedPiece.loaningUser = u
  }

  setFilter(e: string) {
    this.item = null
    this.loanedPiece.book = null
    this.loanedPiece.item = null
    this.filter = e
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
