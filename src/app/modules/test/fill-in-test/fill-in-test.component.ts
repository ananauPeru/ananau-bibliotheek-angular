import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestModel } from "../_models/test/test.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

@Component({
  selector: "app-fill-in-test",
  templateUrl: "./fill-in-test.component.html",
  styleUrls: ["./fill-in-test.component.scss"],
})
export class FillInTestComponent implements OnInit {
  @ViewChild("confirmSubmitModal") confirmSubmitModal: TemplateRef<any>;

  test$: Observable<TestModel>;
  testForm: FormGroup;
  currentSectionIndex = 0;
  timeLeft: number;
  timerInterval: any;
  isTestSubmitted = false;
  score = 0;
  totalQuestions = 0;

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
      this.gradeTest(test);
    }
  }

  gradeTest(test: TestModel) {
    this.score = 0;
    this.totalQuestions = 0;

    test.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question) => {
        this.totalQuestions++;

        const selectedAnswerId = this.testForm.get(section.id.toString()).get(question.id.toString()).value;
        const selectedAnswer = question.answers.find((answer) => answer.id === selectedAnswerId);

        if (selectedAnswer && selectedAnswer.isCorrect) {
          this.score++;
        }
      });
    });

    this.isTestSubmitted = true;
    this.endTest();
  }

  isAnswerSelected(test: TestModel, sectionIndex: number, questionId: number, answerId: number): boolean {
    const selectedAnswerId = this.testForm.get(test.sections[sectionIndex].id.toString()).get(questionId.toString()).value;
    return selectedAnswerId === answerId;
  }

  retryTest(test: TestModel) {
    this.resetTest();
    this.startTest(test);
  }

  resetTest() {
    this.isTestSubmitted = false;
    this.score = 0;
    this.totalQuestions = 0;
    this.currentSectionIndex = 0;
    this.timeLeft = 0;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
}