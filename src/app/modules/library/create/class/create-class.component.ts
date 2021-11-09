import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { tap } from 'rxjs/operators';
import { ToastrUtil } from 'src/app/_utils/toastr_util';
import { ClassDTO } from '../../_dto/class-dto';
import { ClassLanguages } from '../../_models/class-languages.enum';
import { ClassSubject } from '../../_models/class-subject.enum';
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
 public classImage = new Array<File>()
  value: string = 'no'; 
  formGroup: FormGroup
  public ClassCategories = ClassLanguages
  public ClassSubjects = ClassSubject
  
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
      console.log(data)
      console.log(data['class'])
    })
    this.route.params.subscribe((params) => {
      this.routeId = params['id']
    })
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      Title: [
        this.class && this.class.title ? this.class.title : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      Author: [
        this.class && this.class.author ? this.class.author : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      Description: [
        this.class && this.class.description ? this.class.description : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      PdfUrl: [
        this.class && this.class.pdfUrl ? this.class.pdfUrl : '',
        Validators.compose([
          Validators.required,
        ])
      ],
      Extra_PdfUrl: [
        this.class && this.class.translatedPdf ? this.class.translatedPdf : '',
        Validators.compose([
        ])
      ],
      Public: [
        this.class && this.class.public ? this.class.public : '',
        Validators.compose([
          Validators.required
        ])
      ],
      Language: [
        this.class && this.class.language ? this.class.language : '',
        Validators.compose([
          Validators.required,
        ])
      ],
      Extra_Language: [
        this.class && this.class.translate ? this.class.translate : '',
        Validators.compose([
        ])
      ],
      Subject: [
        this.class && this.class.subjects ? this.class.subjects : '',
        Validators.compose([
          Validators.required,
        ])
      ],
      CreationDate: [
        this.class && this.class.creationDate ?  new NgbDate(
          new Date(
            this.datePipe.transform(this.class.creationDate, 'yyyy-MM-dd'),
          ).getFullYear(),
          new Date(
            this.datePipe.transform(this.class.creationDate, 'yyyy-MM-dd'),
          ).getMonth() + 1,
          new Date(
            this.datePipe.transform(this.class.creationDate, 'yyyy-MM-dd'),
          ).getDate(),
        )
      : new NgbDate(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate(),
        ),
        Validators.compose([
          Validators.required
        ])
      ],
    })

    if(this.class.translate)
    {
      this.value = "extra";
    }
  }

  save(){
    this.formGroup.markAllAsTouched()
    if (!this.formGroup.valid){
      return
    }
    const formValues = this.formGroup.value
    if (!this.class){
      let item = new ClassDTO()
      item.title = formValues.Title
      item.author = formValues.Author
      item.description = formValues.Description
      item.creationDate = new Date(
        Date.UTC(
          formValues.CreationDate.year,
          formValues.CreationDate.month - 1,
          formValues.CreationDate.day,
        ),
      )
      item.pdfUrl = formValues.PdfUrl
      item.public = formValues.Public
      item.language = formValues.Language
      item.subjects = formValues.Subject
      if (this.value === "extra"){
        item.translate = formValues.Extra_Language
        item.translatedPdf = formValues.Extra_PdfUrl
      }
      this.create(item);
    }
    else{
      this.class.title = formValues.Title
      this.class.author = formValues.Author
      this.class.description = formValues.Description
      this.class.creationDate = new Date(
        Date.UTC(
          formValues.CreationDate.year,
          formValues.CreationDate.month - 1,
          formValues.CreationDate.day,
        ),
      )
      this.class.pdfUrl = formValues.PdfUrl
      this.class.public = formValues.Public
      this.class.language = formValues.Language
      this.class.subjects = formValues.Subject
      this.create(this.class)
    }
  }

  create(item: ClassDTO) {
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
              this.router.navigate(['/library/classes/overview'])
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
  }

  public onRemoveClassImage(event: File) {
    this.classImages.splice(this.classImages.indexOf(event), 1)
  }

  public async onSelectClassImages(event: NgxDropzoneChangeEvent) {
    this.classImage.push(...event.addedFiles)
    var url = await this.itemStorage.storeImage$(event.addedFiles[0])
    this.formGroup.get('Extra_PdfUrl').setValue(url)
  }

  public onRemoveClassImages(event: File) {
    this.classImage.splice(this.classImage.indexOf(event), 1)
  }


  onDelete() {
    if (!this.class) {
      this.toastrUtil.showError(
        "Something went wrong, couldn't delete... Try again later.",
        'Error',
      )
    } else {
      const idelete = this.classService
        .delete(this.class.classID)
        .pipe(
          tap(
            (res) => {
              this.toastrUtil.showSuccess(
                'Item successfully deleted.',
                'Item Deleted',
              )
              this.router.navigate(['/library/classes/overview'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'Item could not be deleted... Try again later.',
                'Error',
              )
            },
          ),
        )
        .subscribe()
    }
    this.cservice.loadInitialData()
  }



}
