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
    private bookService: BookHTTPService,
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
    console.log(this.book)
    // this.book.purchasedAt.toDateString()
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [
        this.book && this.book.name ? this.book.name : '',
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
          ? this.datePipe.transform(
              new Date(this.book.purchasedAt),
              'yyyy-MM-dd',
            )
          : '',
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
      photourl: [''],
      bookImage: [
        false,
        // , Validators.requiredTrue
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
      item.name = formValues.name
      item.author = formValues.author
      item.category = 'BOOK'
      item.genre = formValues.genre.toUpperCase()
      item.description = formValues.description
      item.state = formValues.state
      this.create(item)
    } else {
      this.book.name = formValues.name
      this.book.author = formValues.author
      this.book.category = 'BOOK'
      this.book.genre = formValues.genre.toUpperCase()
      this.book.description = formValues.description
      this.book.state = formValues.state
      this.book.purchasedAt = new Date(
        formValues.purchasedAt.year,
        formValues.purchasedAt.month,
        formValues.purchasedAt.day,
      )
      this.create(this.book)
    }

    // console.log(item)
  }

  create(item: any) {
    console.log(item)
    if (!this.book) {
      const icreate = this.bookService
        .create(item)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              console.log('success!!!')
              console.log(data)
              this.toastrUtil.showSuccess(
                'Book successfully created!',
                'Book Created',
              )
              this.router.navigate(['/library/books/overview'])
            },
            (error) => {
              console.log('error!!!')
              console.log(error)
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
              console.log('success!!!')
              console.log(data)
              this.toastrUtil.showSuccess(
                'Book successfully edited!',
                'Changes Saved',
              )
              this.router.navigate(['/library/books/overview'])
            },
            (error) => {
              console.log('error!!!')
              console.log(error)
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

  public onSelectBookImage(event: NgxDropzoneChangeEvent) {
    this.bookImages.push(...event.addedFiles)
    // this.updateInternationalPassport()
  }

  public onRemoveBookImage(event: File) {
    this.bookImages.splice(this.bookImages.indexOf(event), 1)
    // this.updateInternationalPassport();
  }

  // private updateInternationalPassport() {
  //   const internationalPassport = this.scansForm.get("internationalPassport");
  //   if (this.internationalPassportFiles.length > 0) {
  //     internationalPassport.setValue(true);
  //   } else {
  //     internationalPassport.setValue(false);
  //   }
  //   internationalPassport.markAsTouched();
  // }
}
