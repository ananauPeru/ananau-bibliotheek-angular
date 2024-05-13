import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ExerciseService } from "../_service/exercise/exercise.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AssignExerciseRequest, ExerciseModel, LearnerModel, StudentExerciseModel } from "../_model/exercise.model";
import { Observable } from "rxjs";
import { SubmissionService } from "../_service/submission/submission.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ToastrService } from "ngx-toastr";
import { ItemStorageService } from "src/app/shared/services/file-storage/file-storage.service";
import { CreateSubmissionDto } from "../_dto/create-submission-dto";
import { AuthUtil } from "src/app/_utils/auth_util";
import { ExerciseSubmissionModel, SubmissionResultModel } from "../_model/submission.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssignModalComponent } from "../components/assign-modal/assign-modal.component";

@Component({
  selector: "app-overview-exercise",
  templateUrl: "./overview-exercise.component.html",
  styleUrls: ["./overview-exercise.component.scss"],
})
export class OverviewExerciseComponent implements OnInit {

  exercise$: Observable<ExerciseModel | StudentExerciseModel>;
  submissionForm: FormGroup;
  submissionFiles: File[] = [];
  isLoading = false;
  assignForm: FormGroup;
  learners$: Observable<LearnerModel[]>;

  constructor(
    private exerciseService: ExerciseService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private itemStorageService: ItemStorageService,
    private modalService: NgbModal,
    private router: Router,
    public AuthUtil: AuthUtil,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getExerciseDetails();
    this.initializeSubmissionForm();
    this.initializeAssignForm();
    this.getLearners();
  }

  getExerciseDetails() {
    const exerciseId: number = this.route.snapshot.params["id"];
    this.exercise$ = this.exerciseService.getExerciseById$(exerciseId);
  }

  getLearners() {
    this.learners$ = this.exerciseService.getLearners$();
  }

  fileUrlToName(fileUrl: string): string {
    if (!fileUrl) return "";
    if (fileUrl.includes("blob:")) return "File";
    if (fileUrl.includes("http")) return fileUrl.split("/").pop();
    return fileUrl;
  }

  initializeSubmissionForm() {
    this.submissionForm = this.formBuilder.group({
      files: [[], Validators.required],
      comment: [""],
    });
  }

  initializeAssignForm() {
    this.assignForm = this.formBuilder.group({
      deadline: ['', Validators.required],
      assignedTo: [null, Validators.required]
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

      this.submissionService.createSubmission$(exercise.id, submission).subscribe(
        (submissionResultModel: SubmissionResultModel) => {
          console.log("Submission created successfully!");
          this.toast.success("Submission created successfully!");
          this.submissionForm.reset();
          this.submissionFiles = [];
          this.submissionForm.get("files").setValue([]);
          this.isLoading = false; // Set isLoading back to false after successful submission
          this.getExerciseDetails(); // Refresh the exercise details
          this.cdr.detectChanges();
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

  isPassedSubmissionDate(exercise: StudentExerciseModel): boolean {
    return new Date(exercise.deadline) < new Date();
  }

  onRemoveFile(file: File) {
    const index = this.submissionFiles.indexOf(file);
    if (index !== -1) {
      this.submissionFiles.splice(index, 1);
      this.submissionForm.get("files").setValue(this.submissionFiles);
    }
  }

  getGradedByText(submission: ExerciseSubmissionModel): string {
    if (submission.grade === null) {
      return "Not graded yet";
    } else {
      return `${submission.gradedBy.firstName} ${submission.gradedBy.lastName}`;
    }
  }

  getGradeText(exercise: ExerciseModel, submission: ExerciseSubmissionModel): string {
    if (submission.grade === null) {
      return "Not graded";
    } else {
      return `${submission.grade} / ${exercise.maxGrade}`;
    }
  }

  openAssignModal(learners: LearnerModel[]) {
    const modalRef = this.modalService.open(AssignModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.learners = learners;
    modalRef.componentInstance.exerciseId = this.route.snapshot.params["id"];
  }
}
