import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ExerciseService } from "../_service/exercise/exercise.service";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ItemStorageService } from "src/app/shared/services/file-storage/file-storage.service";
import { CreateExerciseDto } from "../_dto/create-exercise-dto";
import { AuthUtil } from "src/app/_utils/auth_util";
import { ExerciseModel, TypeModel } from "../_model/exercise.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ScansFile } from "src/app/shared/models/storage/scan-file.model";

@Component({
  selector: "app-create-exercise",
  templateUrl: "./create-exercise.component.html",
  styleUrls: ["./create-exercise.component.scss"],
})
export class CreateExerciseComponent implements OnInit {
  public exerciseForm: FormGroup;
  public files: File[] = [];
  public exerciseTypes$: Observable<TypeModel[]>;
  public isLoading: boolean = false;
  public previewImageForNonImageFiles: File;


  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    public AuthUtil: AuthUtil,
    private itemStorageService: ItemStorageService,
    private router: Router,
    private toast: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getExerciseTypes();
    this.loadPdfIcon();
  }

  private initializeForm() {
    this.exerciseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      exerciseType: ['', Validators.required],
      maxGrade: ['', [Validators.required, Validators.min(1)]],
      files: [[], Validators.required]
    });
  }

  private loadPdfIcon() {
    this.http.get("/assets/images/pdf.png", { responseType: "blob" }).subscribe(
      (image) => {
        this.previewImageForNonImageFiles = new File([image], "pdf.png", {
          type: "image/png",
        });
      },
      (error) => console.error(error)
    );
  }

  public getPreviewImage(file: ScansFile): File {
    if (this.isImageFile(file)) return file;
    else return this.previewImageForNonImageFiles;
  }

  onExerciseTypeChange() {
    if (this.shouldHideMaxGrade()) {
      this.exerciseForm.get('maxGrade').setValue(null);
      this.exerciseForm.get('maxGrade').clearValidators();
    } else {
      this.exerciseForm.get('maxGrade').setValidators([Validators.required, Validators.min(1)]);
    }
    this.exerciseForm.get('maxGrade').updateValueAndValidity();
  }

  getExerciseTypes() {
    this.exerciseTypes$ = this.exerciseService.getExerciseTypes$();
  }

  shouldHideMaxGrade(): boolean {
    const selectedExerciseTypeId = this.exerciseForm.get('exerciseType').value;
    const practiceExerciseTypeId = 2;
    return selectedExerciseTypeId == practiceExerciseTypeId;
  }


  // Form Submission
  async onSubmit() {
    this.exerciseForm.markAllAsTouched();
    if (this.exerciseForm.invalid) {
      this.toast.error(
        "Please fill in all required fields and upload at least one file."
      );
      return;
    }

    this.isLoading = true;
    const exerciseDto: CreateExerciseDto = this.exerciseForm
      .value as CreateExerciseDto;
    exerciseDto.typeId = this.exerciseForm.get('exerciseType').value;

    try {
      const fileUrls: string[] = [];
      for (const file of this.files) {
        const fileUrl = await this.itemStorageService.storeFile$(file);
        fileUrls.push(fileUrl);
      }
      exerciseDto.fileUrls = fileUrls;

      this.exerciseService.createExercise$(exerciseDto).subscribe(
        (exercise: ExerciseModel) => {
          this.toast.success("Exercise created successfully!");
          this.isLoading = false;
          this.router.navigate([`/exercise/overview/${exercise.id}`]);
        },
        (error) => {
          console.error("Error creating exercise: ", error);
          this.toast.error("Error creating exercise");
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.error("Error uploading files: ", error);
      this.toast.error("Error uploading files");
      this.isLoading = false;
    }
  }

  public getNonImagePreview(file: File): File {
    if (!this.isImageFile(file)) {
      const pdfIconFile = new File(["/assets/images/pdf.png"], "pdf.png", { type: "image/png" });
      return pdfIconFile;
    } else {
      return null;
    }
  }





  public isImageFile(file: File): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(fileExtension);
  }

  public getFilePreviewURL(file: File): string {
    if (this.isImageFile(file)) {
      return URL.createObjectURL(file);
    } else {
      return null;
    }
  }







/*   public getPreviewImageURL(file: File): string {
    console.log("File extension:", file.name.split('.').pop()?.toLowerCase());
    if (this.isImageFile(file)) {
      console.log("Image file:", file.name);
      return URL.createObjectURL(file);
    } else {
      console.log("Non-image file:", file.name);
      return this.pdfIconUrl;
    }
  } */










  // File handling
  onSelectFiles(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
    this.exerciseForm.get("files").setValue(this.files);
  }

  onRemoveFile(file: File) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
      this.exerciseForm.get("files").setValue(this.files);
    }
  }
}
