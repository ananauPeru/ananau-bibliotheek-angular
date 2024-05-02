import { Component, OnInit } from "@angular/core";
import { ExerciseService } from "../_service/exercise/exercise.service";
import { ActivatedRoute } from "@angular/router";
import { ExerciseModel } from "../_model/exercise.model";
import { Observable } from "rxjs";
import { SubmissionService } from "../_service/submission/submission.service";
import { SubmissionModel } from "src/app/shared/models/submission/submission.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ToastrService } from "ngx-toastr";
import { ItemStorageService } from "src/app/shared/services/file-storage/file-storage.service";
import { SubmissionDto } from "../_dto/submission-dto";

@Component({
  selector: "app-overview-exercise",
  templateUrl: "./overview-exercise.component.html",
  styleUrls: ["./overview-exercise.component.scss"],
})
export class OverviewExerciseComponent implements OnInit {
  isTeacherView = false; // Flag to determine the view (student or teacher)
  exercise$: Observable<ExerciseModel>;
  submissions$: Observable<SubmissionModel[]>;
  files = [
    { name: "file1.pdf", url: "http://example.com/file1.pdf" },
    { name: "file2.pdf", url: "http://example.com/file2.pdf" },
  ];
  submissionForm: FormGroup;
  submissionFiles: File[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private itemStorageService: ItemStorageService
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
    this.submissions$ = this.submissionService.getSubmissions$(exerciseId, userId);
  }

  initializeSubmissionForm() {
    this.submissionForm = this.formBuilder.group({
      files: [[], Validators.required],
      comment: [""],
    });
  }

  downloadFile(file: any) {
    // Implement the logic to download the file
    console.log("Downloading file:", file.name);
  }

  downloadAllFiles() {
    // Implement the logic to download all files
  }

  async submitExercise() {
    this.submissionForm.markAllAsTouched();

    if (this.submissionForm.invalid) {
      this.toast.error("Please upload at least one file.");
      return;
    }

    try {
      const fileUrls: string[] = [];
      for (const file of this.submissionFiles) {
        const fileUrl = await this.itemStorageService.storeFile$(file);
        fileUrls.push(fileUrl);
      }

      const submission: SubmissionDto = {
        exerciseId: this.route.snapshot.params["id"],
        userId: 1, // TODO: Get the current user's ID
        fileUrls: fileUrls,
        comment: this.submissionForm.get("comment").value,
        submissionDate: new Date(),
      };

      this.submissionService.createSubmission$(submission).subscribe(
        () => {
          console.log("Submission created successfully!");
          this.toast.success("Submission created successfully!");
          this.getSubmissions();
          this.submissionForm.reset();
          this.submissionFiles = [];
          this.getSubmissions();
        },
        (error) => {
          console.error("Error creating submission: ", error);
          this.toast.error("Error creating submission");
        }
      );
    } catch (error) {
      console.error("Error uploading files: ", error);
      this.toast.error("Error uploading files");
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