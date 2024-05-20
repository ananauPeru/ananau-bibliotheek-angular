import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel, TestSubmissionModel } from '../_models/test/test-submission.model';
import { Observable } from 'rxjs';
import { AuthUtil } from "src/app/_utils/auth_util";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { GradeSubmissionTestDto } from '../_dto/grade-submission-test-dto';
import { SubmissionTestService } from '../_services/submission-test/submission-test.service';
import { TestModel, TestSubmitDTO } from '../_models/test/test.model';
import { FileUtil } from 'src/app/_utils/file_util';
import { QuestionUtil } from "../_types/QuestionUtil";

@Component({
  selector: 'app-submission-test-details',
  templateUrl: './submission-test-details.component.html',
  styleUrls: ['./submission-test-details.component.scss']
})
export class SubmissionTestDetailsComponent implements OnInit {
    //The grading part of this page, should only be visable to the teacher

    //test$: Observable<TestModel>;
    submissionTest$: Observable<TestSubmissionModel>;
    isEditingScore = false;
    gradeForm: FormGroup;
    isEditingGrade = false;
    testForm: FormGroup;
    testDto: TestSubmitDTO


  constructor(
    public AuthUtil: AuthUtil,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private submissionTestService: SubmissionTestService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fileUtil: FileUtil,
    public QuestionUtil: QuestionUtil
  ) { }

  ngOnInit() {
    this.getSubmissionTestDetails();
    this.initializeGradeForm();
   // this.getSubmittedTestAnswers();
  }

  /* getSubmittedTestAnswers() {
    const submittedTestId: number = this.route.snapshot.params["id"];
    this.submissionTest$ = this.submissionTestService.getSubmissionAnswers$(submittedTestId);
  } */

  getSubmissionTestDetails() {
    const submittedTestId: number = this.route.snapshot.params["id"];
    this.submissionTest$ = this.submissionTestService.getSubmissionTestById$(submittedTestId);

    this.submissionTest$.subscribe(
      (submissionTest: TestSubmissionModel) => {
        console.log(submissionTest);
      }
    );
  }

  getImageUrls(fileUrls: string[]): string[] {
    return fileUrls.filter((url) => this.fileUtil.isImageFile(url));
  }

  getAudioUrls(fileUrls: string[]): string[] {
    return fileUrls.filter((url) => this.fileUtil.isAudioFile(url));
  }

  initializeGradeForm() {
    this.gradeForm = this.formBuilder.group({
      score: ["", [Validators.required, Validators.min(0)]],
    });

    this.submissionTest$.subscribe(
      (submissionTest: TestSubmissionModel) => {
        this.gradeForm.patchValue({
          totalNotAuto: submissionTest.realScores.totalNotAuto,
        });

        // Update the max validator based on the max possible value
        this.gradeForm
          .get("score")
          .setValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(submissionTest.possibleScores.maxNotAuto),
          ]);
        this.gradeForm.get("score").updateValueAndValidity();
      }
    );
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;

    textarea.style.height = "auto";

    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height =
      (newHeight > initialHeight ? newHeight : initialHeight) + "px";
  }

  submitScore() {
    if (this.gradeForm.invalid) {
      this.toast.error("Please provide a score.");
      return;
    }

    const submissionId: number = this.route.snapshot.params["id"];
    const score: number = this.gradeForm.get("score").value;
    const questionId: number = this.route.snapshot.params["questionId"];

    const gradeSubmissionTestDto: GradeSubmissionTestDto = new GradeSubmissionTestDto([
      { questionId: questionId, score: score }
    ]);

    this.submissionTestService
      .gradeSubmission$(submissionId, gradeSubmissionTestDto)
      .subscribe(
        (success) => {
          if (success) {
            this.toast.success("Submission graded successfully!");
            this.getSubmissionTestDetails();
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
      );
  }
}
