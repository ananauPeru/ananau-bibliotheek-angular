import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestModel } from "../_models/test/test.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

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
  @ViewChild("confirmSubmitModal") confirmSubmitModal: TemplateRef<any>;
  @ViewChildren("cardSelectable") cardSelectableElements: QueryList<ElementRef>;

  test$: Observable<TestModel>;
  testForm: FormGroup;
  currentSectionIndex = 0;
  timeLeft: number;
  timerInterval: any;
  score = 0;
  totalQuestions = 0;
  currentState: TestState = TestState.NotStarted;
  testState = TestState; // Add this line to access TestState enum in the HTML template

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getTestDetails();
  }

  getCorrectTest(): Observable<TestModel> {
    const testId = this.route.snapshot.params["id"];
    return this.testService.getLatestTestVersionById$(testId);
  }

  getTestDetails() {
    const testId = this.route.snapshot.params["id"];
    const accessCode = this.route.snapshot.queryParams["AccessCode"];

    if (!testId || !accessCode) {
      this.router.navigate(["/test/list"]);
      return;
    }

    console.log("Fetching test details...");
    this.test$ = this.testService.getTestExaminationById$(testId, accessCode);
  }

  initializeForm(test: TestModel) {
    this.testForm = this.formBuilder.group({});

    test.sections.forEach((section) => {
      const sectionGroup = this.formBuilder.group({});

      section.questions.forEach((question) => {
        let questionControl;

        if (question.type.name === "Multiple Choice") {
          questionControl = this.formBuilder.control("", Validators.required);
        } else if (question.type.name === "Fill in the Blank") {
          questionControl = this.formBuilder.control("", Validators.required);
        }

        sectionGroup.addControl(question.id.toString(), questionControl);
      });

      this.testForm.addControl(section.id.toString(), sectionGroup);
    });
  }

  startTest(test: TestModel) {
    this.initializeForm(test);
    this.timeLeft = test.timeLimitMinutes * 60;
    this.startTimer();
    this.currentState = TestState.InProgress;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endTest();
      }
    }, 1000);
  }

  endTest() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  nextSection(test: TestModel) {
    if (this.currentSectionIndex < test.sections.length - 1) {
      this.currentSectionIndex++;
    }
  }

  previousSection() {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
    }
  }

  submitTest(test: TestModel) {
    if (this.testForm.invalid) {
      this.modalService.open(this.confirmSubmitModal, { centered: true });
    } else {
      this.currentState = TestState.Grading;
      this.gradeTest(test);
    }
  }

  gradeTest(test: TestModel) {
    this.score = 0;
    this.totalQuestions = 0;
    const correctTest$: Observable<TestModel> = this.getCorrectTest();

    correctTest$.subscribe((correctTest) => {
      console.log(correctTest)
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

      console.log(this.currentState);
      this.currentState = TestState.Graded;
      this.endTest();
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
    this.currentSectionIndex = 0;
    this.timeLeft = 0;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.currentState = TestState.NotStarted;
  }
}