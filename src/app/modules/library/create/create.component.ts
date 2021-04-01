import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ItemModel } from '../_models/item.model'
import { ItemHTTPService } from '../_services/item-http'

const EMPTY_ITEM: ItemModel = {
  id: undefined,
  category: '',
  name: '',
  brand: '',
  description: '',
  material: '',
  photoUrl: '',
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private itemService: ItemHTTPService,
    private router: Router,
    private route: ActivatedRoute,
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
      brand: [
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
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ]),
      ],
      photourl: [''],
    })
  }

  reset() {
    this.formGroup.reset()
  }

  save() {
    this.formGroup.markAllAsTouched()
    if (!this.formGroup.valid) {
      return
    }

    const formValues = this.formGroup.value
    // this.product = Object.assign(this.product, formValues)
    // if (this.id) {
    //   this.edit()
    // } else {
    //   this.create()
    // }
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
