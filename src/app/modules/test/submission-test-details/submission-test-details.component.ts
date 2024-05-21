import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SectionModel, StudentTestSubmissionModel, TeacherTestSubmissionModel, TestSubmissionModel } from '../_models/test/test-submission.model';
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
import { QuestionEvaluatedModel } from '../_models/test/question.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-submission-test-details',
  templateUrl: './submission-test-details.component.html',
  styleUrls: ['./submission-test-details.component.scss']
})
export class SubmissionTestDetailsComponent implements OnInit {
  submissionTest$: Observable<TestSubmissionModel>;
  isEditingScore = false;
  gradeForm: FormGroup;
  testForm: FormGroup;
  testDto: TestSubmitDTO;

  constructor(
    public AuthUtil: AuthUtil,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private submissionTestService: SubmissionTestService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fileUtil: FileUtil,
    public QuestionUtil: QuestionUtil,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getSubmissionTestDetails();
    this.initializeGradeForm();
    this.initializeOpenQuestionScores();
  }

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
    this.gradeForm = this.formBuilder.group({});
  }

  initializeOpenQuestionScores() {
    this.submissionTest$.subscribe(
      (submissionTest: TestSubmissionModel) => {
        submissionTest.sections.forEach((section: SectionModel) => {
          section.questions.forEach((question) => {
            if (this.QuestionUtil.isQuestionTypeIgnoreCase(question.type.name, this.QuestionUtil.types.OPEN_QUESTION)) {
              const controlName = 'question-' + question.id + '-score';
              const initialScore = question.learnerAnswer && question.learnerAnswer.score !== null ? question.learnerAnswer.score : '';
              this.gradeForm.addControl(controlName, this.formBuilder.control(initialScore, [Validators.required, Validators.min(0), Validators.max(10)]));
            }
          });
        });
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
    this.gradeForm.markAllAsTouched();
    if (this.gradeForm.invalid) {
      this.toast.error(this.translateService.instant("TEST.SUBMISSION_DETAILS.ERRORS.PROVIDE_VALID_SCORES"));
      return;
    }
  
    const submissionId: number = this.route.snapshot.params["id"];
    const questionScores = [];
  
    this.submissionTest$.subscribe(
      (submissionTest: TestSubmissionModel) => {
        submissionTest.sections.forEach((section) => {
          section.questions.forEach((question) => {
            if (this.QuestionUtil.isQuestionTypeIgnoreCase(question.type.name, this.QuestionUtil.types.OPEN_QUESTION)) {
              const controlName = 'question-' + question.id + '-score';
              const score = this.gradeForm.get(controlName).value;
              if (score !== '') {
                questionScores.push({ questionId: question.id, score: score });
              }
            }
          });
        });
  
        const gradeSubmissionTestDto: GradeSubmissionTestDto = new GradeSubmissionTestDto(questionScores);
  
        this.submissionTestService.gradeSubmission$(submissionId, gradeSubmissionTestDto).subscribe(
          (success) => {
            if (success) {
              this.toast.success(this.translateService.instant("TEST.SUBMISSION_DETAILS.MESSAGES.GRADED_SUCCESFULLY"));
              this.getSubmissionTestDetails();
              this.isEditingScore = false;
              this.cdr.detectChanges();
            } else {
              this.toast.error(this.translateService.instant("TEST.SUBMISSION_DETAILS.ERRORS.FAILED_TO_GRADE"));
            }
          },
          (error) => {
            console.error("Error grading submission: ", error);
            this.toast.error(this.translateService.instant("TEST.SUBMISSION_DETAILS.ERRORS.FAILED_TO_GRADE"));
          }
        );
      }
    );
  }

  getQuestionGradeText(question: QuestionEvaluatedModel): string {
    if(question.isAutoEvaluated) {
      return `(${question.learnerAnswer.score}/1)`
    } else if(!question.isAutoEvaluated && question.learnerAnswer.score) {
      return `(${question.learnerAnswer.score}/10)`
    } else {
      const translatedText = this.translateService.instant("TEST.SUBMISSION_DETAILS.MESSAGES.NO_GRADE");
      return `(${translatedText})`;
    }
  }

  getFillInTheBlankAnswerText(question: QuestionEvaluatedModel): string {
    let translatedText = this.translateService.instant("TEST.SUBMISSION_DETAILS.MESSAGES.CORRECT");
    if(!question.learnerAnswer.isCorrect) {
      translatedText = this.translateService.instant("TEST.SUBMISSION_DETAILS.MESSAGES.INCORRECT");
    }
    return question.learnerAnswer.answerText + ` (${translatedText})`;
  }

  getCorrectAnswerText(question: QuestionEvaluatedModel): string {
    if(question.isAutoEvaluated) {
      return question.answers.find((answer) => answer.isCorrect).answerText;
    } else {
      return this.translateService.instant("TEST.SUBMISSION_DETAILS.MESSAGES.NOT_AVAILABLE"); 
    }
  }

  startEditing() {
    this.isEditingScore = true;
  }
}