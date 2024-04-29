import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TestDTO } from "../_dto/test-dto";
import { QuestionTypeService } from "../_services/question-type/question-type.service";
import { Observable } from "rxjs";
import { QuestionTypeModel } from "../_models/question-type/question-type.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TestService } from "../_services/test/test.service";
import { ToastrService } from "ngx-toastr";
import { TestModel } from "../_models/test/test.model";
import { QuestionModel } from "../_models/test/question.model";

function requireOneCorrectAnswer(
  answersArray: FormArray
): { [key: string]: boolean } | null {
  const hasCorrectAnswer = answersArray.value.some(
    (answer) => answer.isCorrect
  );
  return hasCorrectAnswer ? null : { requireOneCorrectAnswer: true };
}

@Component({
  selector: "app-create-test",
  templateUrl: "./create-test.component.html",
  styleUrls: ["./create-test.component.scss"],
})
export class CreateTestComponent implements OnInit {
  @ViewChild("settingsModal") settingsModal: TemplateRef<any>;

  public testForm: FormGroup;
  public settingsForm: FormGroup;
  public questionTypes$: Observable<QuestionTypeModel[]>;
  public isEditMode = false;
  public testId: number;

  constructor(
    private formBuilder: FormBuilder,
    private questionTypeService: QuestionTypeService,
    private modalService: NgbModal,
    private testService: TestService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeQuestionTypes();
    this.initializeForm();
    this.checkEditMode();
  }

  // Form Initialization
  private initializeForm() {
    this.testForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: "",
      sections: this.formBuilder.array([], Validators.required),
    });

    this.settingsForm = this.formBuilder.group({
      timeLimitMinutes: [60, Validators.required],
    });

    if (!this.isEditMode) {
      this.addSection();
    }
  }

  // Edit Mode
  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.isEditMode = true;
        this.testId = +params.id;
        this.loadTestData();
      }
    });
  }

  private loadTestData() {
    this.testService.getLatestTestVersionById$(this.testId).subscribe(
      (test: TestModel) => {
        this.patchFormValues(test);
      },
      (error) => {
        console.error("Error fetching test data: ", error);
        this.toast.error("Error fetching test data");
      }
    );
  }

  private patchFormValues(test: TestModel) {
    this.testForm.patchValue({
      title: test.title,
      description: test.description,
    });

    this.settingsForm.patchValue({
      timeLimitMinutes: test.timeLimitMinutes,
    });

    this.patchSectionsFormArray(test.sections);
  }

  private patchSectionsFormArray(sections: any[]) {
    const sectionsFormArray = this.sections;
    sectionsFormArray.clear();

    sections.forEach((section) => {
      const sectionGroup = this.formBuilder.group({
        title: [section.title, Validators.required],
        description: section.description,
        questions: this.formBuilder.array([], Validators.required),
      });
      this.patchQuestionsFormArray(sectionGroup, section.questions);
      sectionsFormArray.push(sectionGroup);
    });
  }

  private patchQuestionsFormArray(
    sectionGroup: FormGroup,
    questions: QuestionModel[]
  ) {
    const questionsFormArray = sectionGroup.get("questions") as FormArray;
    questionsFormArray.clear();

    questions.forEach((question) => {
      const questionGroup = this.formBuilder.group({
        questionText: [question.questionText, Validators.required],
        type: [question.type, Validators.required],
        answers: this.formBuilder.array([], Validators.required),
      });
      this.patchAnswersFormArray(questionGroup, question.answers);
      questionsFormArray.push(questionGroup);
    });
  }

  private patchAnswersFormArray(questionGroup: FormGroup, answers: any[]) {
    const answersFormArray = questionGroup.get("answers") as FormArray;
    answersFormArray.clear();

    answers.forEach((answer) => {
      const answerGroup = this.formBuilder.group({
        answerText: [answer.answerText, Validators.required],
        isCorrect: answer.isCorrect,
      });
      answersFormArray.push(answerGroup);
    });

    // Apply the custom validator to the answers FormArray
    answersFormArray.setValidators([
      Validators.required,
      requireOneCorrectAnswer,
    ]);
    answersFormArray.updateValueAndValidity();
  }

  // Question Types
  private initializeQuestionTypes() {
    this.questionTypes$ = this.questionTypeService.getQuestionTypes$();
  }

  compareQuestionTypes(
    type1: QuestionTypeModel,
    type2: QuestionTypeModel
  ): boolean {
    return type1 && type2 ? type1.id === type2.id : type1 === type2;
  }

  // Form Submission
  onSubmit() {
    this.markAllAsTouched(this.testForm);

    if (!this.isAllFieldsFilled()) {
      this.toast.error("Please fill in all required fields.");
      return;
    }

    const testDto = this.testForm.value as TestDTO;

    // Map the setting values to the DTO
    const timeLimitMinutes = this.settingsForm.get("timeLimitMinutes").value;
    testDto.timeLimitMinutes = timeLimitMinutes;

    if (this.isEditMode) {
      // Update test
      this.testService.updateTest$(this.testId, testDto).subscribe(
        () => {
          console.log("Test updated successfully!");
          this.toast.success("Test updated successfully!");
          this.router.navigate(["/test/list"]);
        },
        (error) => {
          console.error("Error updating test: ", error);
          this.toast.error("Error updating test");
        }
      );
    } else {
      // Create test
      this.testService.createTest$(testDto).subscribe(
        () => {
          console.log("Test created successfully!");
          this.toast.success("Test created successfully!");
          this.router.navigate(["/test/list"]);
        },
        (error) => {
          console.error("Error creating test: ", error);
          this.toast.error("Error creating test");
        }
      );
    }
  }

  /**
   * Check if all required fields are filled
   */
  isAllFieldsFilled(): boolean {
    if (this.testForm.invalid) {
      return false;
    }

    const sections = this.sections.controls;
    for (const section of sections) {
      if (section.get("title").invalid || section.get("questions").invalid) {
        return false;
      }

      const questions = section.get("questions").value;
      for (const question of questions) {
        if (
          question.questionText.trim() === "" ||
          question.type === null ||
          question.answers.length === 0
        ) {
          return false;
        }

        for (const answer of question.answers) {
          if (answer.answerText.trim() === "") {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Mark all form controls as touched
   * @param form The form to mark as touched
   */
  private markAllAsTouched(form: FormGroup | FormArray) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      }
    });
  }

  // Sections
  get sections(): FormArray {
    return this.testForm.get("sections") as FormArray;
  }

  addSection() {
    const sectionGroup = this.formBuilder.group({
      title: ["", Validators.required],
      description: "",
      questions: this.formBuilder.array([], Validators.required),
    });
    this.sections.push(sectionGroup);
    this.addQuestion(sectionGroup);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  // Questions
  addQuestion(sectionGroup: FormGroup) {
    const questionsArray = sectionGroup.get("questions") as FormArray;

    // Get the last question in the section
    const lastQuestion =
      questionsArray.length > 0
        ? questionsArray.at(questionsArray.length - 1)
        : null;

    // Get the type of the last question, or set it to null if there are no questions
    const lastQuestionType = lastQuestion
      ? lastQuestion.get("type").value
      : null;

    const questionGroup = this.formBuilder.group({
      questionText: ["", Validators.required],
      type: new FormControl(lastQuestionType, Validators.required),
      answers: this.formBuilder.array(
        [],
        [Validators.required, requireOneCorrectAnswer]
      ),
    });

    // Add one blank answer based on the last question type
    if (lastQuestionType) {
      const answersArray = questionGroup.get("answers") as FormArray;
      if (lastQuestionType.name === "Multiple Choice") {
        answersArray.push(
          this.formBuilder.group({
            answerText: ["", Validators.required],
            isCorrect: false,
          })
        );
      } else if (lastQuestionType.name === "Fill in the Blank") {
        answersArray.push(
          this.formBuilder.group({
            answerText: ["", Validators.required],
            isCorrect: true,
          })
        );
      }
    }

    // Subscribe to changes in the question type
    questionGroup
      .get("type")
      .valueChanges.subscribe((selectedType: QuestionTypeModel) => {
        const answersArray = questionGroup.get("answers") as FormArray;

        // Clear existing answers
        while (answersArray.length !== 0) {
          answersArray.removeAt(0);
        }

        // Add one blank answer based on the selected question type
        if (selectedType) {
          if (selectedType.name === "Multiple Choice") {
            answersArray.push(
              this.formBuilder.group({
                answerText: ["", Validators.required],
                isCorrect: false,
              })
            );
          } else if (selectedType.name === "Fill in the Blank") {
            answersArray.push(
              this.formBuilder.group({
                answerText: ["", Validators.required],
                isCorrect: true,
              })
            );
          }
        }
      });

    questionsArray.push(questionGroup);
  }

  removeQuestion(sectionGroup: FormGroup, questionIndex: number) {
    const questionsArray = sectionGroup.get("questions") as FormArray;
    questionsArray.removeAt(questionIndex);
  }

  // Options (Multiple Choice)
  addOption(questionGroup: FormGroup) {
    const optionsArray = questionGroup.get("answers") as FormArray;
    optionsArray.push(
      this.formBuilder.group({
        answerText: ["", Validators.required],
        isCorrect: false,
      })
    );
    optionsArray.updateValueAndValidity();
  }

  removeOption(questionGroup: FormGroup, optionIndex: number) {
    const optionsArray = questionGroup.get("answers") as FormArray;
    optionsArray.removeAt(optionIndex);
    optionsArray.updateValueAndValidity();
  }

  // Blanks (Fill in the Blank)
  addBlank(questionGroup: FormGroup) {
    const answersArray = questionGroup.get("answers") as FormArray;
    answersArray.push(
      this.formBuilder.group({
        answerText: ["", Validators.required],
        isCorrect: true,
      })
    );
  }

  removeBlank(questionGroup: FormGroup, blankIndex: number) {
    const answersArray = questionGroup.get("answers") as FormArray;
    answersArray.removeAt(blankIndex);
  }

  // Settings Modal
  openSettingsModal() {
    this.modalService.open(this.settingsModal, { centered: true });
  }

  saveSettings() {
    const timeLimitMinutes = this.settingsForm.get("timeLimitMinutes").value;
    this.testForm.patchValue({ timeLimitMinutes });
    this.modalService.dismissAll();
  }
}