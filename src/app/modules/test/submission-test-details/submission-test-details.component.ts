import { Component, OnInit } from '@angular/core';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel } from '../_models/test/test-submission.model';
import { Observable } from 'rxjs';
import { AuthUtil } from "src/app/_utils/auth_util";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { GradeSubmissionTestDto } from '../_dto/grade-submission-test-dto';
import { SubmissionTestService } from '../_services/submission-test/submission-test.service';

@Component({
  selector: 'app-submission-test-details',
  templateUrl: './submission-test-details.component.html',
  styleUrls: ['./submission-test-details.component.scss']
})
export class SubmissionTestDetailsComponent implements OnInit {
    //The grading part of this page, should only be visable to the teacher

    submissionTest$: Observable<TeacherTestSubmissionModel | StudentTestSubmissionModel>;
    isEditingScore = false;
    gradeForm: FormGroup;

  constructor(
    public AuthUtil: AuthUtil,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private submissionTestService: SubmissionTestService,
  ) { }

  ngOnInit(): void {
  }

  submitScore() {
    if (this.gradeForm.invalid) {
      this.toast.error("Please provide a score.");
      return;
    }

    const submissionId: number = this.route.snapshot.params["id"];
    const score: number = this.gradeForm.get("score").value;

    const gradeSubmissionTestDto: GradeSubmissionTestDto = {
      score: score,
    };

    /* this.submissionTestService
      .gradeSubmission$(submissionId, gradeSubmissionTestDto)
      .subscribe(
        (success) => {
          if (success) {
            this.toast.success("Submission graded successfully!");
            this.getSubmissionDetails();
            this.isEditingGrade = false;
            this.cdr.detectChanges(); // Trigger change detection
          } else {
            this.toast.error("Failed to grade submission");
          }
        },
        (error) => {
          console.error("Error grading submission: ", error);
          this.toast.error("Error grading submission");
        }
      ); */
  }
}
