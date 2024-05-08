import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestModel } from "../_models/test/test.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
        } else if (question.type.name === "Fill In The Blank") {
          questionControl = this.formBuilder.control("", Validators.required);
        } else if (question.type.name === "Open Question") {
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
    timer(0, 1000)
      .pipe(
        map(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
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

  submitTest(test: TestModel, force: boolean = false) {

    if(force || !this.testForm.invalid) {
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
      console.log(correctTest);
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
              } else if (question.type.name === "Fill In The Blank") {
                const userAnswer = selectedAnswerId;
                const correctAnswer = correctQuestion.answers[0].answerText;

                if (userAnswer === correctAnswer) {
                  this.score++;
                }
              } else if (question.type.name === "Open Question") {
                // For Open Question questions, do not automatically grade, as correctness is checked manually by the teacher
              }
            }
          });
        }
      });

      console.log(this.currentState);
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
