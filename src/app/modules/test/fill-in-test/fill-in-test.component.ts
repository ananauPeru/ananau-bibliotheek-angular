import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestModel } from "../_models/test/test.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subject, timer } from "rxjs";
import { map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FileUtil } from "src/app/_utils/file_util";
import { QuestionType } from "../_types/QuestionType";
import { QuestionUtil } from "../_types/QuestionUtil";

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
  score = 0;
  totalQuestions = 0;
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
    public QuestionUtil: QuestionUtil
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
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  submitTest(test: TestModel, force: boolean = false) {
    if (force || !this.testForm.invalid) {
      this.currentState = TestState.Grading;
      this.gradeTest(test);
      return;
    }

    this.modalService.open(this.confirmationModal, { centered: true });
  }

  gradeTest(test: TestModel) {
    this.score = 0;
    this.totalQuestions = 0;
    const correctTest$: Observable<TestModel> = this.getCorrectTest();

    correctTest$.subscribe((correctTest) => {
      if (correctTest === null) return;

      test.sections.forEach((section) => {
        const correctSection = correctTest.sections.find(
          (s) => s.id === section.id
        );
        if (correctSection) {
          section.questions.forEach((question) => {
            this.totalQuestions++;
            const selectedAnswerId = this.testForm
              .get(section.id.toString())
              .get(question.id.toString()).value;

            const correctQuestion = correctSection.questions.find(
              (q) => q.id === question.id
            );
            if (correctQuestion) {
              if (question.type.name === "Multiple Choice") {
                const selectedAnswer = question.answers.find(
                  (answer) => answer.id === selectedAnswerId
                );
                const correctAnswer = correctQuestion.answers.find(
                  (answer) => answer.isCorrect
                );

                if (
                  selectedAnswer &&
                  correctAnswer &&
                  selectedAnswer.id === correctAnswer.id
                ) {
                  this.score++;
                }
              } else if (question.type.name === "Fill in the Blank") {
                const userAnswer = selectedAnswerId;
                const correctAnswer = correctQuestion.answers[0].answerText;

                if (userAnswer === correctAnswer) {
                  this.score++;
                }
              }
            }
          });
        }
      });

      this.currentState = TestState.Graded;
    });
  }

  isAnswerCorrect(answer: any, sectionId: number, questionId: number): boolean {
    const correctTest$: Observable<TestModel> = this.getCorrectTest();
    let isCorrect = false;

    correctTest$.subscribe((correctTest) => {
      if (correctTest === null) return;

      const correctSection = correctTest.sections.find(
        (s) => s.id === sectionId
      );
      if (correctSection) {
        const correctQuestion = correctSection.questions.find(
          (q) => q.id === questionId
        );
        if (correctQuestion) {
          const correctAnswer = correctQuestion.answers.find(
            (a) => a.isCorrect
          );
          if (correctAnswer && correctAnswer.id === answer.id) {
            isCorrect = true;
          }
        }
      }
    });

    return isCorrect;
  }

  isAnswerSelected(
    sectionId: number,
    questionId: number,
    answerId: number
  ): boolean {
    const selectedAnswerId = this.testForm
      .get(sectionId.toString())
      .get(questionId.toString()).value;
    return selectedAnswerId === answerId;
  }

  getCorrectAnswer(sectionId: number, questionId: number): string {
    const correctTest$: Observable<TestModel> = this.getCorrectTest();
    let correctAnswer = "";

    correctTest$.subscribe((correctTest) => {
      if (correctTest === null) return;

      const correctSection = correctTest.sections.find(
        (s) => s.id === sectionId
      );
      if (correctSection) {
        const correctQuestion = correctSection.questions.find(
          (q) => q.id === questionId
        );
        if (
          correctQuestion &&
          correctQuestion.answers &&
          correctQuestion.answers.length > 0
        ) {
          correctAnswer = correctQuestion.answers[0].answerText;
        }
      }
    });

    return correctAnswer;
  }

  retryTest(test: TestModel) {
    this.resetTest();
    this.startTest(test);
  }

  resetTest() {
    this.score = 0;
    this.totalQuestions = 0;
    this.timeLeft = 0;
    this.currentState = TestState.NotStarted;
  }
}
