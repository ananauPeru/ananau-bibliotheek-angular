import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmissionService } from "../_service/submission/submission.service";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { SubmissionModel } from "../_model/submission.model";
import { GradeSubmissionDto } from "../_dto/grade-submission-dto";

@Component({
  selector: "app-overview-submission",
  templateUrl: "./overview-submission.component.html",
  styleUrls: ["./overview-submission.component.scss"],
})
export class OverviewSubmissionComponent implements OnInit {
  //The grading part of this page, should only be visable to the teacher

  submission$: Observable<SubmissionModel>;
  gradeForm: FormGroup;
  isEditingGrade = false;
  isTeacher = false;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.getSubmissionDetails();
    this.initializeGradeForm();
    this.getUserDetails();
  }

  getUserDetails() {
    // Implement the logic to check if the user is a teacher
    console.log("Checking if user is a teacher...");
    this.isTeacher = true;
  }

  getSubmissionDetails() {
    const submissionId: number = this.route.snapshot.params["id"];
    this.submission$ = this.submissionService.getSubmissionById$(submissionId);
  }

  initializeGradeForm() {
    this.gradeForm = this.formBuilder.group({
      grade: ["", Validators.required],
      feedback: [""],
    });

    this.submission$.subscribe((submission: SubmissionModel) => {
      this.gradeForm.patchValue({
        grade: submission.grade,
      });
    });
  }

  downloadFile(fileUrl: string) {
    // Implement the logic to download the file
    console.log("Downloading file:", fileUrl);
  }

  submitGrade() {
    if (this.gradeForm.invalid) {
      this.toast.error("Please provide a grade and total grade.");
      return;
    }

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
        (submission: SubmissionModel) => {
          console.log("Submission graded successfully!");
          this.toast.success("Submission graded successfully!");
          this.getSubmissionDetails();
          this.isEditingGrade = false;
          console.log(submission);
        },
        (error) => {
          console.error("Error grading submission: ", error);
          this.toast.error("Error grading submission");
        }
      );
  }
}
