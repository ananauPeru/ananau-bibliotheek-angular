import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { tap } from 'rxjs/operators';
import { ToastrUtil } from 'src/app/_utils/toastr_util';
import { ClassDTO } from '../../_dto/class-dto';
import { ClassModel } from '../../_models/class.model';
import { ClassHTTPService } from '../../_services/class/class-http/class-http.service';
import { ClassService } from '../../_services/class/class.sercice';
import { ItemStorageService } from '../../_services/storage/item-storage.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {
  public class: ClassModel
  public routeId: number
 // public BookCategories = BookCategories
  public classImages = new Array<File>()

  formGroup: FormGroup
  
  constructor(
    private fb: FormBuilder,
    private cservice: ClassService,
    private classService: ClassHTTPService,
    private itemStorage: ItemStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public toastrUtil: ToastrUtil,
    private datePipe: DatePipe,
  ) { 
    this.route.data.subscribe((data) => {
      this.class = data['class']
    })
    this.route.params.subscribe((params) => {
      this.routeId = params['id']
    })
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      Title: [
        this.class && this.class.Title ? this.class.Title : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      Author: [
        this.class && this.class.Author ? this.class.Author : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      Description: [
        this.class && this.class.Description ? this.class.Description : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      PdfUrl: [
        this.class && this.class.PdfUrl ? this.class.PdfUrl : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ])
      ],
      Public: [
        this.class && this.class.Public ? this.class.Public : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      CreationDate: [
        this.class && this.class.CreationDate ? this.class.CreationDate : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ])
      ],
    })
  }

  save(){
    this.formGroup.markAllAsTouched()
    if (!this.formGroup.valid){
      return
    }
    const formValues = this.formGroup.value
    if (!this.class){
      let item = new ClassDTO()
      item.Title = formValues.Title
      item.Author = formValues.Author
      item.Description = formValues.Description
      item.CreationDate = formValues.CreationDate
      item.PdfUrl = formValues.PdfUrl
      item.Public = formValues.Public


    }
  }

  create(item: any) {
    if (!this.class) {
      const icreate = this.classService
        .create(item)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'Class successfully created!',
                'Class Created',
              )
              this.cservice.loadInitialData()
              this.router.navigate(['/library/classes/overview'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Class could not be added... Try again later.',
                'Error',
              )
            },
          ),
        )
        .subscribe((res) => res as ClassModel)
      // this.subscriptions.push(sbCreate)
    } else {
      const icreate = this.classService
        .edit(this.routeId, item)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'Class successfully edited!',
                'Changes Saved',
              )
              this.cservice.loadInitialData();
              this.router.navigate(['/library/Classes/overview'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Class could not be edited... Try again later.',
                'Error',
              )
            },
          ),
        )
        .subscribe((res) => res as ClassModel)
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

  public async onSelectClassImage(event: NgxDropzoneChangeEvent) {
    this.classImages.push(...event.addedFiles)
    var url = await this.itemStorage.storeImage$(event.addedFiles[0])
    this.formGroup.get('PdfUrl').setValue(url)
    // this.updateInternationalPassport()
  }

  public onRemoveClassImage(event: File) {
    this.classImages.splice(this.classImages.indexOf(event), 1)
    // this.updateInternationalPassport();
  }

}
