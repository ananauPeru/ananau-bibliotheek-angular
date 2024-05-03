import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmissionService } from '../_service/submission/submission.service';
import { SubmissionModel } from 'src/app/shared/models/submission/submission.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overview-submission',
  templateUrl: './overview-submission.component.html',
  styleUrls: ['./overview-submission.component.scss']
})
export class OverviewSubmissionComponent implements OnInit {
  submission$: Observable<SubmissionModel>;
  gradeForm: FormGroup;
  isEditingGrade = false;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) { }

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
      grade: ['', Validators.required],
      totalGrade: ['', Validators.required]
    });

    this.submission$.subscribe((submission: SubmissionModel) => {
      this.gradeForm.patchValue({
        grade: submission.grade,
        totalGrade: submission.totalGrade
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
    const grade: number = this.gradeForm.get('grade').value;
    const totalGrade: number = this.gradeForm.get('totalGrade').value;

    this.submissionService.gradeSubmission$(submissionId, grade, totalGrade).subscribe(
      () => {
        console.log("Submission graded successfully!");
        this.toast.success("Submission graded successfully!");
        this.getSubmissionDetails();
        this.isEditingGrade = false;
      },
      (error) => {
        console.error("Error grading submission: ", error);
        this.toast.error("Error grading submission");
      }
    );
  }
}