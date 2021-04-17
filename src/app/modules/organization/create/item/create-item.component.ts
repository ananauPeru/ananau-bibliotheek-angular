import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { ToastrUtil } from 'src/app/_utils/toastr_util'
import { NgxDropzoneChangeEvent } from 'ngx-dropzone'
import { ItemModel } from '../../_models/item.model'
import { ItemHTTPService } from '../../_services/item/item-http/item-http.service'
import { DatePipe } from '@angular/common'
import { ItemDTO } from '../../_dto/item-dto'
import { EducationalCourses } from '../../_models/educational-courses.enum'

@Component({
  selector: 'app-create',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  public item: ItemModel
  public routeId: number
  public EducationalCourses = EducationalCourses
  public itemImages = new Array<File>()

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private itemService: ItemHTTPService,
    private router: Router,
    private route: ActivatedRoute,
    public toastrUtil: ToastrUtil,
    private datePipe: DatePipe,
  ) {
    this.route.data.subscribe((data) => {
      this.item = data['item']
    })
    this.route.params.subscribe((params) => {
      this.routeId = params['id']
    })
    // this.item.purchasedAt.toDateString()
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [
        this.item && this.item.name ? this.item.name : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      course: [
        this.item && this.item.course ? this.item.course : '',
        Validators.compose([Validators.required]),
      ],
      purpose: [
        this.item && this.item.purpose ? this.item.purpose : '',
        Validators.compose([Validators.required]),
      ],
      brand: [
        this.item && this.item.brand ? this.item.brand : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      purchasedAt: [
        this.item && this.item.purchasedAt
          ? this.datePipe.transform(
              new Date(this.item.purchasedAt),
              'yyyy-MM-dd',
            )
          : '',
        Validators.compose([Validators.required]),
      ],
      description: [
        this.item && this.item.description ? this.item.description : '',
        // Validators.compose([
        //   Validators.required,
        //   Validators.minLength(3),
        //   Validators.maxLength(500),
        // ]),
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

    if (!this.item) {
      let item = new ItemDTO()
      item.name = formValues.name
      item.brand = formValues.brand
      item.category = 'BOOK'
      item.course = formValues.course.toUpperCase()
      item.description = formValues.description
      this.create(item)
    } else {
      this.item.name = formValues.name
      this.item.brand = formValues.brand
      this.item.category = 'BOOK'
      this.item.course = formValues.course.toUpperCase()
      this.item.description = formValues.description
      this.item.purchasedAt = new Date(
        formValues.purchasedAt.year,
        formValues.purchasedAt.month,
        formValues.purchasedAt.day,
      )
      this.create(this.item)
    }

    // console.log(item)
  }

  create(item: any) {
    console.log(item)
    if (!this.item) {
      const icreate = this.itemService
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
        .subscribe((res) => res as ItemModel)
      // this.subscriptions.push(sbCreate)
    } else {
      const icreate = this.itemService
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
        .subscribe((res) => res as ItemModel)
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
    this.itemImages.push(...event.addedFiles)
    // this.updateInternationalPassport()
  }

  public onRemoveBookImage(event: File) {
    this.itemImages.splice(this.itemImages.indexOf(event), 1)
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
