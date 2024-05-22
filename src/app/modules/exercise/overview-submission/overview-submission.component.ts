import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmissionService } from "../_service/submission/submission.service";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { GradeSubmissionDto } from "../_dto/grade-submission-dto";
import {
  StudentSubmissionModel,
  TeacherSubmissionModel,
} from "../_model/submission.model";
import { AuthUtil } from "src/app/_utils/auth_util";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-overview-submission",
  templateUrl: "./overview-submission.component.html",
  styleUrls: ["./overview-submission.component.scss"],
})
export class OverviewSubmissionComponent implements OnInit {
  //The grading part of this page, should only be visable to the teacher

  submission$: Observable<TeacherSubmissionModel | StudentSubmissionModel>;
  gradeForm: FormGroup;
  isEditingGrade = false;
  public isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private submissionService: SubmissionService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    public AuthUtil: AuthUtil,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getSubmissionDetails();
    this.initializeGradeForm();
  }

  getSubmissionDetails() {
    const submissionId: number = this.route.snapshot.params["id"];
    this.submission$ = this.submissionService.getSubmissionById$(submissionId);
  }

  initializeGradeForm() {
    this.gradeForm = this.formBuilder.group({
      grade: ["", [Validators.required, Validators.min(0)]],
      feedback: [""],
    });

    this.submission$.subscribe(
      (submission: TeacherSubmissionModel | StudentSubmissionModel) => {
        this.gradeForm.patchValue({
          grade: submission.grade,
          feedback: submission.feedback,
        });

        // Update the max validator based on the maxGrade value
        this.gradeForm
          .get("grade")
          .setValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(submission.exercise.maxGrade),
          ]);
        this.gradeForm.get("grade").updateValueAndValidity();
      }
    );
  }

  fileUrlToName(fileUrl: string): string {
    if (!fileUrl) return "";
    if (fileUrl.includes("uniqueprefix-"))
      return fileUrl.split("uniqueprefix-").pop();
    if (fileUrl.includes("blob:")) return "File";
    if (fileUrl.includes("http")) return fileUrl.split("/").pop();

    return fileUrl;
  }

  downloadFile(fileUrl: string) {
    window.open(fileUrl, "_blank");
  }

  submitGrade() {
    if (this.gradeForm.invalid) {
      this.toast.error("Please provide a grade and total grade.");
      return;
    }

    this.isLoading = true;
    const submissionId: number = this.route.snapshot.params["id"];
    const grade: number = this.gradeForm.get("grade").value;
    const feedback: string = this.gradeForm.get("feedback").value;

    const gradeSubmissionDto: GradeSubmissionDto = {
      grade: grade,
      feedback: feedback,
    };

    this.submissionService
      .gradeSubmission$(submissionId, gradeSubmissionDto)
      .subscribe(
        (success) => {
          if (success) {
            this.toast.success("Submission graded successfully!");
            this.getSubmissionDetails();
            this.isEditingGrade = false;
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection
          } else {
            this.toast.error("Failed to grade submission");
          }
        },
        (error) => {
          console.error("Error grading submission: ", error);
          this.toast.error("Error grading submission");
          this.isLoading = false;
        }
      );
  }
}
