import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestEvaluatedModel, TestModel, TestSubmitDTO } from "../_models/test/test.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FileUtil } from "src/app/_utils/file_util";
import { QuestionUtil } from "../_types/QuestionUtil";
import { ToastrUtil } from "src/app/_utils/toastr_util";

export enum TestState {
  NotStarted,
  InProgress,
  Submitted,
  Grading,
  Graded,
}

@Component({
  selector: "app-fill-in-test",
  templateUrl: "./fill-in-test.component.html",
  styleUrls: ["./fill-in-test.component.scss"],
})
export class FillInTestComponent implements OnInit {
  @ViewChild("confirmationModal") confirmationModal: TemplateRef<any>;

  test$: Observable<TestModel>;
  testForm: FormGroup;
  timeLeft: number;
  currentState: TestState = TestState.NotStarted;
  testState = TestState;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private fileUtil: FileUtil,
    private cdr: ChangeDetectorRef,
    public QuestionUtil: QuestionUtil,
    private toast: ToastrUtil
  ) {}

  ngOnInit() {
    this.getTestDetails();
  }

  getCorrectTest(): Observable<TestModel> {
    const testId = this.route.snapshot.params["id"];
    return this.testService.getLatestTestVersionById$(testId);
  }

  getImageUrls(fileUrls: string[]): string[] {
    return fileUrls.filter((url) => this.fileUtil.isImageFile(url));
  }

  getAudioUrls(fileUrls: string[]): string[] {
    return fileUrls.filter((url) => this.fileUtil.isAudioFile(url));
  }

  getTestDetails() {
    const testId = this.route.snapshot.params["id"];
    const accessCode = this.route.snapshot.queryParams["AccessCode"];

    if (!testId || !accessCode) {
      this.router.navigate(["/test/list"]);
      return;
    }

    this.test$ = this.testService.getTestExaminationById$(testId, accessCode);
  }

  initializeForm(test: TestModel) {
    this.testForm = this.formBuilder.group({});

    test.sections.forEach((section) => {
      const sectionGroup = this.formBuilder.group({});

      section.questions.forEach((question) => {
        const questionControl = this.formBuilder.control(
          "",
          Validators.required
        );

        sectionGroup.addControl(question.id.toString(), questionControl);
      });

      this.testForm.addControl(section.id.toString(), sectionGroup);
    });
  }

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;

    textarea.style.height = "auto";

    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height =
      (newHeight > initialHeight ? newHeight : initialHeight) + "px";
  }

  startTest(test: TestModel) {
    this.initializeForm(test);
    this.timeLeft = test.timeLimitMinutes * 60;
    this.startTimer();
    this.currentState = TestState.InProgress;
  }

  startTimer() {
    timer(0, 1000)
      .pipe(
        map(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
            this.cdr.detectChanges();
          } else {
            this.endTest();
          }
        })
      )
      .subscribe();
  }

  endTest() {
    this.currentState = TestState.Submitted;
    const testId = this.route.snapshot.params["id"];
    console.log(testId);
    this.submitTest(testId, true);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }


  submitTest(testId: number, force: boolean = false) {
  if (force || !this.testForm.invalid) {
    const testFormValue = this.testForm.value;
    console.log(testFormValue);
    const testSubmitDto: TestSubmitDTO = {
      learnerAnswers: [],
    };
    for (const sectionId in testFormValue) {
      if (testFormValue.hasOwnProperty(sectionId)) {
        const section = testFormValue[sectionId];
        for (const questionId in section) {
          if (section.hasOwnProperty(questionId)) {
            const answer = section[questionId];
            if (typeof answer === 'number') {
              testSubmitDto.learnerAnswers.push({
                questionId: parseInt(questionId),
                answer: {
                  answerId: answer,
                  answerText: null,
                },
              });
            } else {
              testSubmitDto.learnerAnswers.push({
                questionId: parseInt(questionId),
                answer: {
                  answerId: null,
                  answerText: answer,
                },
              });
            }
          }
        }
      }
    }

    this.testService.submitTest$(testId, testSubmitDto).subscribe(
      (evaulatedTest: TestEvaluatedModel) => {
        this.router.navigate([`/test/submitted/${evaulatedTest.id}`]);
        this.toast.showSuccess("Success", "Test submitted successfully");
      },
      (error) => {
        this.toast.showError("Error", "Error submitting test");
      }
    );
    return;
  }
  this.modalService.open(this.confirmationModal, { centered: true });
}

  gradeTest() {
    const testId = this.route.snapshot.params["id"];
    this.router.navigate([`/test/submission/${testId}`]);
    this.currentState = TestState.Graded;
  }
}
