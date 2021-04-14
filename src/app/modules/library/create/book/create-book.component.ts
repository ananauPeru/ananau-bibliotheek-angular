import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { ToastrUtil } from 'src/app/_utils/toastr_util'
import { ItemDTO } from '../../_dto/item-dto'
import { ItemModel } from '../../_models/item.model'
import { ItemHTTPService } from '../../_services/item/item-http/item-http.service'

@Component({
  selector: 'app-create',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private itemService: ItemHTTPService,
    private router: Router,
    private route: ActivatedRoute,
    public toastrUtil: ToastrUtil,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      category: ['', Validators.compose([Validators.required])],
      author: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      material: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        '',
        // Validators.compose([
        //   Validators.required,
        //   Validators.minLength(3),
        //   Validators.maxLength(500),
        // ]),
      ],
      photourl: [''],
    })
  }

  save() {
    this.formGroup.markAllAsTouched()
    if (!this.formGroup.valid) {
      return
    }

    const formValues = this.formGroup.value
    let item = new ItemDTO()
    item.name = formValues.name
    item.brand = formValues.brand
    item.material = formValues.material
    item.category = formValues.category
    item.description = formValues.description
    this.create(item)
    // this.product = Object.assign(this.product, formValues)
    // if (this.id) {
    //   this.edit()
    // } else {
    //   this.create()
    // }
  }

  create(item: ItemDTO) {
    console.log(item)
    const icreate = this.itemService
      .create(item)
      .pipe(
        tap(
          // Log the result or error
          (data) => {
            console.log('success!!!')
            console.log(data)
            this.toastrUtil.showSuccess('Item successfully created!', 'Item Created')
            // this.router.navigate(['/library'])
          },
          (error) => {
            console.log('error!!!')
            console.log(error)
            this.toastrUtil.showError('Item could not be added... Try again later.', 'Error')
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
