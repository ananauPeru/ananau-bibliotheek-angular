import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router'
import { of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { ToastrUtil } from 'src/app/_utils/toastr_util'
import { BookCategories } from '../../_models/book-categories.enum'
import { NgxDropzoneChangeEvent } from 'ngx-dropzone'
import { BookDTO } from '../../_dto/book-dto'
import { BookHTTPService } from '../../_services/book/book-http/book-http.service'
import { BookModel } from '../../_models/book.model'
import { DatePipe } from '@angular/common'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { ItemStorageService } from '../../_services/storage/item-storage.service'
import { BookService } from '../../_services/book/book.service'

@Component({
  selector: 'app-create',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  public book: BookModel
  public routeId: number
  public BookCategories = BookCategories
  public bookImages = new Array<File>()

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private bservice: BookService,
    private bookService: BookHTTPService,
    private itemStorage: ItemStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public toastrUtil: ToastrUtil,
    private datePipe: DatePipe,
  ) {
    this.route.data.subscribe((data) => {
      this.book = data['book']
    })
    this.route.params.subscribe((params) => {
      this.routeId = params['id']
    })
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: [
        this.book && this.book.title ? this.book.title : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      genre: [
        this.book && this.book.genre ? this.book.genre : '',
        Validators.compose([Validators.required]),
      ],
      author: [
        this.book && this.book.author ? this.book.author : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      purchasedAt: [
        this.book && this.book.purchasedAt
          ? new NgbDate(
              new Date(
                this.datePipe.transform(this.book.purchasedAt, 'yyyy-MM-dd'),
              ).getFullYear(),
              new Date(
                this.datePipe.transform(this.book.purchasedAt, 'yyyy-MM-dd'),
              ).getMonth() + 1,
              new Date(
                this.datePipe.transform(this.book.purchasedAt, 'yyyy-MM-dd'),
              ).getDate(),
            )
          : new NgbDate(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate(),
            ),

        Validators.compose([Validators.required]),
      ],
      description: [
        this.book && this.book.description ? this.book.description : '',
        // Validators.compose([
        //   Validators.required,
        //   Validators.minLength(3),
        //   Validators.maxLength(500),
        // ]),
      ],
      state: [
        this.book && this.book.state ? this.book.state : '',
        Validators.compose([Validators.required]),
      ],
      photoUrl: [this.book && this.book.description ? this.book.photoUrl : ''],
      bookImage: [false, Validators.required],
      quantity: [
        this.book && this.book.quantity ? this.book.quantity : 1,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(1000),
        ]),
      ],
    })
  }

  save() {
    this.formGroup.markAllAsTouched()
    if (!this.formGroup.valid) {
      return
    }

    const formValues = this.formGroup.value

    if (!this.book) {
      let item = new BookDTO()
      item.title = formValues.title
      item.author = formValues.author
      item.category = 'BOOK'
      item.genre = formValues.genre.toUpperCase()
      item.description = formValues.description
      item.state = formValues.state
      item.purchasedAt = new Date(
        Date.UTC(
          formValues.purchasedAt.year,
          formValues.purchasedAt.month - 1,
          formValues.purchasedAt.day,
        ),
      )
      item.photoUrl = formValues.photoUrl
      item.quantity = formValues.quantity
      this.create(item)
    } else {
      this.book.title = formValues.title
      this.book.author = formValues.author
      this.book.category = 'BOOK'
      this.book.genre = formValues.genre.toUpperCase()
      this.book.description = formValues.description
      this.book.quantity = formValues.quantity
      this.book.state = formValues.state
      this.book.purchasedAt = new Date(
        Date.UTC(
          formValues.purchasedAt.year,
          formValues.purchasedAt.month - 1,
          formValues.purchasedAt.day,
        ),
      )
      this.book.photoUrl = formValues.photoUrl
      this.create(this.book)
    }
  }

  create(item: any) {
    if (!this.book) {
      const icreate = this.bookService
        .create(item)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'Book successfully created!',
                'Book Created',
              )
              this.bservice.loadInitialData()
              this.router.navigate(['/library/books/overview'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Book could not be added... Try again later.',
                'Error',
              )
            },
          ),

          // catchError((errorMessage) => {
          //   console.error('UPDATE ERROR', errorMessage)
          //   // return of(this.item)
          //   return errorMessage
          // }),
        )
        .subscribe((res) => res as BookModel)
      // this.subscriptions.push(sbCreate)
    } else {
      const icreate = this.bookService
        .edit(this.routeId, item)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'Book successfully edited!',
                'Changes Saved',
              )
              this.bservice.loadInitialData();
              this.router.navigate(['/library/books/overview'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Book could not be edited... Try again later.',
                'Error',
              )
            },
          ),

          // catchError((errorMessage) => {
          //   console.error('UPDATE ERROR', errorMessage)
          //   // return of(this.item)
          //   return errorMessage
          // }),
        )
        .subscribe((res) => res as BookModel)
      // this.subscriptions.push(sbCreate)
    }
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

  public async onSelectBookImage(event: NgxDropzoneChangeEvent) {
    this.bookImages.push(...event.addedFiles)
    var url = await this.itemStorage.storeImage$(event.addedFiles[0])
    this.formGroup.get('photoUrl').setValue(url)
    // this.updateInternationalPassport()
  }

  public onRemoveBookImage(event: File) {
    this.bookImages.splice(this.bookImages.indexOf(event), 1)
    // this.updateInternationalPassport();
  }
}
