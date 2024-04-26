import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestModel } from "../_models/test/test.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-fill-in-test",
  templateUrl: "./fill-in-test.component.html",
  styleUrls: ["./fill-in-test.component.scss"],
})
export class FillInTestComponent implements OnInit {
  @ViewChild("confirmSubmitModal") confirmSubmitModal: TemplateRef<any>;
  test: TestModel;
  testForm: FormGroup;
  currentSectionIndex = 0;
  timeLeft: number;
  timerInterval: any;

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

    this.testService.getTestExaminationById$(testId, accessCode).subscribe(
      (test: TestModel) => {
        this.test = test;
        console.log(test);
        this.initializeForm();
      },
      (error) => {
        console.error("Error fetching test details:", error);
      }
    );
  }

  initializeForm() {
    this.testForm = this.formBuilder.group({});

    this.test.sections.forEach((section) => {
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

  startTest() {
    this.timeLeft = this.test.timeLimitMinutes * 60;
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
    // TODO: Submit the test answers
    this.router.navigate(["/test/result"]);
  }

  nextSection() {
    if (this.currentSectionIndex < this.test.sections.length - 1) {
      this.currentSectionIndex++;
    }
  }

  previousSection() {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
    }
  }

  submitTest() {
    if (this.testForm.invalid) {
      this.modalService.open(this.confirmSubmitModal, { centered: true });
    } else {
      this.endTest();
    }
  }

  reviewTest() {
    this.markEmptyFields();
    this.currentSectionIndex = this.getFirstInvalidSectionIndex();
  }

  markEmptyFields() {
    Object.keys(this.testForm.controls).forEach((sectionId) => {
      const sectionGroup = this.testForm.get(sectionId) as FormGroup;
      Object.keys(sectionGroup.controls).forEach((questionId) => {
        const questionControl = sectionGroup.get(questionId);
        if (questionControl.invalid) {
          questionControl.markAsDirty();
        }
      });
    });
  }

  getFirstInvalidSectionIndex() {
    for (let i = 0; i < this.test.sections.length; i++) {
      const sectionId = this.test.sections[i].id.toString();
      const sectionGroup = this.testForm.get(sectionId) as FormGroup;
      if (sectionGroup.invalid) {
        return i;
      }
    }
    return 0;
  }
}
