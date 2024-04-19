import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { tap } from 'rxjs/operators'
import { UserModel } from 'src/app/modules/auth'
import { ToastrUtil } from 'src/app/_utils/toastr_util'
import { LoanedPieceDTO } from '../../_dto/loaned-piece-dto'
import { LoanedPieceModel } from '../../_models/loaned-piece.model'
import { LoanService } from '../../_services/loan/loan.service'

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss'],
})
export class AddLoanComponent implements OnInit {
  public loanedPiece: LoanedPieceModel = new LoanedPieceModel()
  public loaningUser: UserModel = null
  public loanForm: FormGroup
  public saving = false
  public step = null

  private routeId = null

  constructor(
    public toastrUtil: ToastrUtil,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private loanService: LoanService,
  ) {
    this.route.data.subscribe((data) => {
      if (data['loan']) {
        this.loanedPiece = data['loan']
        if (this.loanedPiece && this.loanedPiece.loaningUser) {
          this.loaningUser = this.loanedPiece.loaningUser
        }
      }
    })
    this.route.params.subscribe((params) => {
      this.routeId = params['id']
    })
  }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loaningUser: [
        this.loanedPiece && this.loanedPiece.loaningUser
          ? this.loanedPiece.loaningUser.id
          : '',
        Validators.compose([Validators.required]),
      ],
      loanDate: [
        this.loanedPiece && this.loanedPiece.loanDate
          ? new NgbDate(
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.loanDate,
                  'yyyy-MM-dd',
                ),
              ).getFullYear(),
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.loanDate,
                  'yyyy-MM-dd',
                ),
              ).getMonth() + 1,
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.loanDate,
                  'yyyy-MM-dd',
                ),
              ).getDate(),
            )
          : new NgbDate(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate(),
            ),
        Validators.compose([Validators.required]),
      ],
      returnDate: [
        this.loanedPiece && this.loanedPiece.returnDate
          ? new NgbDate(
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.returnDate,
                  'yyyy-MM-dd',
                ),
              ).getFullYear(),
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.returnDate,
                  'yyyy-MM-dd',
                ),
              ).getMonth() + 1,
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.returnDate,
                  'yyyy-MM-dd',
                ),
              ).getDate(),
            )
          : new NgbDate(
              new Date(Date.now() + 12096e5).getFullYear(),
              new Date(Date.now() + 12096e5).getMonth() + 1,
              new Date(Date.now() + 12096e5).getDate(),
            ),
        Validators.compose([Validators.required]),
      ],
      loanState: [
        this.loanedPiece && this.loanedPiece.loanState
          ? this.loanedPiece.loanState
          : 'GOOD',
        Validators.compose([Validators.required]),
      ],
      quantity: [
        this.loanedPiece && this.loanedPiece.quantity
          ? this.loanedPiece.quantity
          : 1,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(1),
        ]),
      ],
      loanStateDescription: [
        this.loanedPiece && this.loanedPiece.loanStateDescription
          ? this.loanedPiece.loanStateDescription
          : '',
      ],
      returnedAt: [
        this.loanedPiece && this.loanedPiece.returnedAt
          ? new NgbDate(
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.returnedAt,
                  'yyyy-MM-dd',
                ),
              ).getFullYear(),
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.returnedAt,
                  'yyyy-MM-dd',
                ),
              ).getMonth() + 1,
              new Date(
                this.datePipe.transform(
                  this.loanedPiece.returnedAt,
                  'yyyy-MM-dd',
                ),
              ).getDate(),
            )
          : new NgbDate(
              new Date(Date.now()).getFullYear(),
              new Date(Date.now()).getMonth() + 1,
              new Date(Date.now()).getDate(),
            ),
        Validators.compose([Validators.required]),
      ],
      returnState: [
        this.loanedPiece && this.loanedPiece.returnState
          ? this.loanedPiece.returnState
          : 'GOOD',
        Validators.compose([Validators.required]),
      ],
      returnStateDescription: [
        this.loanedPiece && this.loanedPiece.returnStateDescription
          ? this.loanedPiece.returnStateDescription
          : '',
      ],
      remarks: [
        this.loanedPiece && this.loanedPiece.remarks
          ? this.loanedPiece.remarks
          : '',
      ],
    })
  }

  saveForm() {
    this.saving = true

    if (this.loanedPiece.loaningUser) {
      this.loanForm.controls['loaningUser'].setValue(
        this.loanedPiece.loaningUser.id,
      )
    }

    // create new
    this.loanForm.markAllAsTouched()
    if (!this.loanForm.valid) {
      this.toastrUtil.showError(
        'Please fill in all necessary fields!',
        "Can't Create",
      )
      this.saving = false
      return
    } else if (!this.loanedPiece.item && !this.loanedPiece.book) {
      this.toastrUtil.showError(
        'Please choose an Item or Book to be loaned out!',
        'Item/Book Missing',
      )
      this.saving = false
      return
    }

    const formValues = this.loanForm.value

    let lp = new LoanedPieceDTO()

    if (this.loanedPiece.loanedPieceId) {
      lp.loanedPieceId = this.loanedPiece.loanedPieceId
    } else {
      lp.loanedPieceId = null
    }

    lp.loaningUserId = formValues.loaningUser
    lp.itemId = this.loanedPiece.item ? this.loanedPiece.item.id : null
    lp.bookId = this.loanedPiece.book ? this.loanedPiece.book.bookId : null
    lp.loanDate = new Date(
      Date.UTC(
        formValues.loanDate.year,
        formValues.loanDate.month - 1,
        formValues.loanDate.day,
      ),
    )
    lp.returnDate = new Date(
      Date.UTC(
        formValues.returnDate.year,
        formValues.returnDate.month - 1,
        formValues.returnDate.day,
      ),
    )
    lp.loanState = formValues.loanState
    lp.quantity = formValues.quantity
    lp.loanStateDescription = formValues.loanStateDescription

    // Return
    lp.returnedAt = new Date(
      Date.UTC(
        formValues.returnedAt.year,
        formValues.returnedAt.month - 1,
        formValues.returnedAt.day,
      ),
    )
    lp.returnState = formValues.returnState
    lp.returnStateDescription = formValues.returnStateDescription
    lp.remarks = formValues.remarks

    if (this.step != 'final') {
      lp.status = 'OPEN'
    } else {
      lp.status = 'CLOSED'
    }

    this.create(lp)
  }

  create(lp: any) {
    if (!lp.loanedPieceId) {
      const icreate = this.loanService
        .create(lp)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'Item/Book successfully loaned out!',
                'Loan Created',
              )
              this.loanService.loadInitialData()
              this.router.navigate(['/library/loans/overview'])
              this.saving = false
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Loan could not be created... Try again later.',
                'Error',
              )
              this.saving = false
            },
          ),
        )
        .subscribe((res) => res as LoanedPieceModel)
      // this.subscriptions.push(sbCreate)
    } else {
      const icreate = this.loanService
        .edit(this.routeId, lp)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'Loan successfully edited!',
                'Changes Saved',
              )
              this.loanService.loadInitialData()
              if (this.step == 'final')
                this.router.navigate(['/library/loans/overview'])
              this.saving = false
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Loan could not be edited... Try again later.',
                'Error',
              )
              this.saving = false
            },
          ),
        )
        .subscribe((res) => res as LoanedPieceModel)
    }
    this.saving = false
  }
}
