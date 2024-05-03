import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ExerciseDto } from "../_dto/exercise-dto";
import { ToastrService } from "ngx-toastr";
import { ExerciseService } from "../_service/exercise/exercise.service";
import { UserService } from "../../organization/_services/user/user.service";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ItemStorageService } from "src/app/shared/services/file-storage/file-storage.service";

@Component({
  selector: "app-create-exercise",
  templateUrl: "./create-exercise.component.html",
  styleUrls: ["./create-exercise.component.scss"],
})
export class CreateExerciseComponent implements OnInit {
  public exerciseForm: FormGroup;
  public files: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private userService: UserService,
    private itemStorageService: ItemStorageService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  // Form Initialization
  private initializeForm() {
    this.exerciseForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: "",
      maxGrade: ["", Validators.required],
      files: [[], Validators.required],
    });
  }

  // Form Submission
  async onSubmit() {
    this.exerciseForm.markAllAsTouched();

    if (this.exerciseForm.invalid) {
      this.toast.error("Please fill in all required fields and upload at least one file.");
      return;
    }

    const exerciseDto: ExerciseDto = this.exerciseForm.value as ExerciseDto;
    exerciseDto.author = "Author 1"; // TODO: This should get the current user's name

    try {
      const fileUrls: string[] = [];
      for (const file of this.files) {
        const fileUrl = await this.itemStorageService.storeFile$(file);
        fileUrls.push(fileUrl);
      }
      exerciseDto.fileUrls = fileUrls;

      this.exerciseService.createExercise$(exerciseDto).subscribe(
        () => {
          console.log("Exercise created successfully!");
          this.toast.success("Exercise created successfully!");
          this.router.navigate(["/exercise/list"]);
        },
        (error) => {
          console.error("Error creating exercise: ", error);
          this.toast.error("Error creating exercise");
        }
      );
    } catch (error) {
      console.error("Error uploading files: ", error);
      this.toast.error("Error uploading files");
    }
  }

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