import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
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

  private initializeForm() {
    this.testForm = this.formBuilder.group({
      title: "",
      description: '',
      sections: this.formBuilder.array([]),
    });

    this.settingsForm = this.formBuilder.group({
      timeLimitMinutes: 60,
    });

    if (!this.isEditMode) {
      this.addSection();
    }
  }

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
    this.testService.getTestById$(this.testId, 1).subscribe(
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
        title: section.title,
        description: section.description,
        questions: this.formBuilder.array([]),
      });
      this.patchQuestionsFormArray(sectionGroup, section.questions);
      sectionsFormArray.push(sectionGroup);
    });
  }

  private patchQuestionsFormArray(sectionGroup: FormGroup, questions: QuestionModel[]) {
    const questionsFormArray = sectionGroup.get("questions") as FormArray;
    questionsFormArray.clear();
  
    questions.forEach((question) => {
      const questionGroup = this.formBuilder.group({
        questionText: question.questionText,
        type: question.type, // Set the type to the value from the question data
        answers: this.formBuilder.array([]),
      });
      this.patchAnswersFormArray(questionGroup, question.answers);
      questionsFormArray.push(questionGroup);
    });
  }

  compareQuestionTypes(type1: QuestionTypeModel, type2: QuestionTypeModel): boolean {
    return type1 && type2 ? type1.id === type2.id : type1 === type2;
  }

  private patchAnswersFormArray(questionGroup: FormGroup, answers: any[]) {
    const answersFormArray = questionGroup.get("answers") as FormArray;
    answersFormArray.clear();

    answers.forEach((answer) => {
      const answerGroup = this.formBuilder.group({
        answerText: answer.answerText,
        isCorrect: answer.isCorrect,
      });
      answersFormArray.push(answerGroup);
    });
  }

  /**
   * Initialize the question types
   */
  private initializeQuestionTypes() {
    this.questionTypes$ = this.questionTypeService.getQuestionTypes$();
  }

  /**
   * Get the sections FormArray
   */
  get sections(): FormArray {
    return this.testForm.get("sections") as FormArray;
  }

  /**
   * Handle form submission
   */
  onSubmit() {
    const testDto = this.testForm.value as TestDTO;

    // Map the setting values to the DTO
    const timeLimitMinutes = this.settingsForm.get('timeLimitMinutes').value;
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
   * Add a new section to the form
   */
  addSection() {
    const sectionGroup = this.formBuilder.group({
      title: "",
      description: '',
      questions: this.formBuilder.array([]),
    });
    this.sections.push(sectionGroup);
    this.addQuestion(sectionGroup);
  }

  /**
   * Add a new question to the form
   * @param sectionGroup the FormGroup representing the section to which the question will be added
   */
  addQuestion(sectionGroup: FormGroup) {
    const questionsArray = sectionGroup.get("questions") as FormArray;
    
    // Get the last question in the section
    const lastQuestion = questionsArray.length > 0 ? questionsArray.at(questionsArray.length - 1) : null;
    
    // Get the type of the last question, or set it to null if there are no questions
    const lastQuestionType = lastQuestion ? lastQuestion.get('type').value : null;
  
    const questionGroup = this.formBuilder.group({
      questionText: "",
      type: new FormControl(lastQuestionType),
      answers: this.formBuilder.array([]),
    });
  
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
                answerText: "",
                isCorrect: false,
              })
            );
          } else if (selectedType.name === "Fill in the Blank") {
            answersArray.push(
              this.formBuilder.group({
                answerText: "",
                isCorrect: true,
              })
            );
          }
        }
      });
  
    questionsArray.push(questionGroup);
  }

  /**
   * Remove a section from the form
   * @param index the index of the section to be removed
   */
  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  /**
   * Remove a question from the form
   * @param sectionGroup the FormGroup representing the section from which the question will be removed
   * @param questionIndex the index of the question to be removed
   */
  removeQuestion(sectionGroup: FormGroup, questionIndex: number) {
    const questionsArray = sectionGroup.get("questions") as FormArray;
    questionsArray.removeAt(questionIndex);
  }

  /**
   * Remove an option from the form for a multiple choice question
   * @param questionGroup the FormGroup representing the question to which the option will be added
   * @param optionIndex the index of the option to be removed
   */
  removeOption(questionGroup: FormGroup, optionIndex: number) {
    const optionsArray = questionGroup.get("answers") as FormArray;
    optionsArray.removeAt(optionIndex);
  }

  /**
   * Add an option to the form for a multiple choice question
   * @param questionGroup the FormGroup representing the question to which the option will be added
   */
  addOption(questionGroup: FormGroup) {
    const optionsArray = questionGroup.get("answers") as FormArray;
    optionsArray.push(
      this.formBuilder.group({
        answerText: "",
        isCorrect: false,
      })
    );
  }

  /**
   * Add a blank to the form for a fill in the blank question
   * @param questionGroup the FormGroup representing the question to which the blank will be added
   */
  addBlank(questionGroup: FormGroup) {
    const answersArray = questionGroup.get("answers") as FormArray;
    answersArray.push(
      this.formBuilder.group({
        answerText: "",
        isCorrect: true,
      })
    );
  }

  /**
   * Remove a blank from the form for a fill in the blank question
   * @param questionGroup the FormGroup representing the question from which the blank will be removed
   * @param blankIndex the index of the blank to be removed
   */
  removeBlank(questionGroup: FormGroup, blankIndex: number) {
    const answersArray = questionGroup.get("answers") as FormArray;
    answersArray.removeAt(blankIndex);
  }

  /**
   * Open the settings modal
   */
  openSettingsModal() {
    this.modalService.open(this.settingsModal, { centered: true });
  }

  /**
   * Save the settings from the modal
   */
  saveSettings() {
    const timeLimitMinutes = this.settingsForm.get('timeLimitMinutes').value;
    this.testForm.patchValue({ timeLimitMinutes });
    this.modalService.dismissAll();
  }
}