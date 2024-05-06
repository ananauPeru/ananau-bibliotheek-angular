import { Component, OnInit, ViewChild } from "@angular/core";
import { ExerciseService } from "../_service/exercise/exercise.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ExerciseModel } from "../_model/exercise.model";
import { Observable } from "rxjs";
import { SubmissionService } from "../_service/submission/submission.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ToastrService } from "ngx-toastr";
import { ItemStorageService } from "src/app/shared/services/file-storage/file-storage.service";
import { SubmissionModel } from "../_model/submission.model";
import { CreateSubmissionDto } from "../_dto/create-submission-dto";

@Component({
  selector: "app-overview-exercise",
  templateUrl: "./overview-exercise.component.html",
  styleUrls: ["./overview-exercise.component.scss"],
})
export class OverviewExerciseComponent implements OnInit {
  isTeacherView = false; // Flag to determine the view (student or teacher)
  exercise$: Observable<ExerciseModel>;
  submissions$: Observable<SubmissionModel[]>;
  submissionForm: FormGroup;
  submissionFiles: File[] = [];
  isLoading = false;

  constructor(
    private exerciseService: ExerciseService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private itemStorageService: ItemStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getExerciseDetails();
    this.getSubmissions();
    this.initializeSubmissionForm();
  }

  getExerciseDetails() {
    const exerciseId: number = this.route.snapshot.params["id"];
    this.exercise$ = this.exerciseService.getExerciseById$(exerciseId);
  }

  getSubmissions() {
    const exerciseId: number = this.route.snapshot.params["id"];
    const userId: number = 1; // TODO: Get the current user's ID
    this.submissions$ =
      this.submissionService.getSubmissionsByUserIdAndExerciseId$(
        userId,
        exerciseId
      );
  }

  initializeSubmissionForm() {
    this.submissionForm = this.formBuilder.group({
      files: [[], Validators.required],
      comment: [""],
    });
  }

  downloadFile(fileUrl: string) {
    window.open(fileUrl, "_blank");
  }

  downloadAllFiles(fileUrls: string[]) {
    fileUrls.forEach((fileUrl) => {
      window.open(fileUrl, "_blank");
    });
  }

  async submitExercise(exercise: ExerciseModel) {
    this.submissionForm.markAllAsTouched();

    if (this.submissionForm.invalid) {
      this.toast.error("Please upload at least one file.");
      return;
    }

    this.isLoading = true; // Set isLoading to true before submitting

    try {
      const fileUrls: string[] = [];
      for (const file of this.submissionFiles) {
        const fileUrl = await this.itemStorageService.storeFile$(file);
        fileUrls.push(fileUrl);
      }

      const submission: CreateSubmissionDto = {
        fileUrls: fileUrls,
        comment: this.submissionForm.get("comment").value
      };

      this.submissionService.createSubmission$(submission).subscribe(
        (submissionModel: SubmissionModel) => {
          console.log("Submission created successfully!");
          this.toast.success("Submission created successfully!");
          this.getSubmissions();
          this.submissionForm.reset();
          this.submissionFiles = [];
          this.submissionForm.get("files").setValue([]);
          this.isLoading = false; // Set isLoading back to false after successful submission
          this.router.navigate([
            `/exercise/submission/overview/${submissionModel.id}`,
          ]);
        },
        (error) => {
          console.error("Error creating submission: ", error);
          this.toast.error("Error creating submission");
          this.isLoading = false; // Set isLoading back to false in case of error
        }
      );
    } catch (error) {
      console.error("Error uploading files: ", error);
      this.toast.error("Error uploading files");
      this.isLoading = false; // Set isLoading back to false in case of error
    }
  }

  onSelectFiles(event: NgxDropzoneChangeEvent) {
    this.submissionFiles.push(...event.addedFiles);
    this.submissionForm.get("files").setValue(this.submissionFiles);
  }

  onRemoveFile(file: File) {
    const index = this.submissionFiles.indexOf(file);
    if (index !== -1) {
      this.submissionFiles.splice(index, 1);
      this.submissionForm.get("files").setValue(this.submissionFiles);
    }
  }
}
