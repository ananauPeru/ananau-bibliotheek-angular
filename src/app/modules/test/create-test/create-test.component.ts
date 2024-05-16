import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
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
import { Observable, Subject, of, forkJoin } from "rxjs";
import { QuestionTypeModel } from "../_models/question-type/question-type.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TestService } from "../_services/test/test.service";
import { ToastrService } from "ngx-toastr";
import { TestModel } from "../_models/test/test.model";
import { QuestionModel } from "../_models/test/question.model";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { ScansFile } from "src/app/shared/models/storage/scan-file.model";
import { HttpClient } from "@angular/common/http";
import { ItemStorageService } from "src/app/shared/services/file-storage/file-storage.service";
import { FileUtil } from "src/app/_utils/file_util";
import { QuestionUtil } from "../_types/QuestionUtil";
import { QuestionType } from "../_types/QuestionType";

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
  public isLoading$: Observable<boolean>;

  public audioPreviewFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private questionTypeService: QuestionTypeService,
    private modalService: NgbModal,
    private testService: TestService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fileStorageService: ItemStorageService,
    private fileUtil: FileUtil,
    private cdr: ChangeDetectorRef,
    public QuestionUtil: QuestionUtil
  ) {}

  ngOnInit() {
    this.initializeQuestionTypes();
    this.initializeAudioPreviewFile();
    this.checkEditMode();
  }

  // Edit Mode
  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.isEditMode = true;
        this.testId = +params.id;
        this.loadTestData();
      } else {
        this.initializeForm();
      }
    });
  }

  private loadTestData() {
    this.testService.getLatestTestVersionById$(this.testId).subscribe(
      (test: TestModel) => {
        this.initializeForm();
        this.patchFormValues(test);
      },
      (error) => {
        console.error("Error fetching test data: ", error);
        this.toast.error("Error fetching test data");
      }
    );
  }

  initializeAudioPreviewFile() {
    this.http
      .get("/assets/images/audio.png", { responseType: "blob" })
      .subscribe(
        (image) => {
          this.audioPreviewFile = new File([image], "audio.png", {
            type: "image/png",
          });
        },
        (error) => console.error(error)
      );
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
        fileUrls: this.formBuilder.array([]),
      });

      const fileUrls = question.fileUrls || [];
      const fileObservables = fileUrls.map((fileUrl) =>
        this.fileUtil.urlToFile(fileUrl)
      );

      if (fileObservables.length === 0) {
        this.patchAnswersFormArray(questionGroup, question.answers);
      } else {
        forkJoin(fileObservables).subscribe(
          (files: File[]) => {
            const fileUrlsFormArray = questionGroup.get(
              "fileUrls"
            ) as FormArray;
            files.forEach((file) => {
              fileUrlsFormArray.push(new FormControl(file));
            });
            this.patchAnswersFormArray(questionGroup, question.answers);
            this.cdr.detectChanges();
          },
          (error) => {
            console.error("Error loading attachments:", error);
            this.cdr.detectChanges();
          }
        );
      }

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

    if (
      !this.QuestionUtil.isQuestionType(
        questionGroup.get("type").value.name,
        QuestionType.OPEN_QUESTION
      )
    ) {
      answersFormArray.setValidators([
        Validators.required,
        requireOneCorrectAnswer,
      ]);
    } else {
      answersFormArray.setValidators([]);
    }
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
  async onSubmit() {
    this.markAllAsTouched(this.testForm);

    if (!this.isAllFieldsFilled()) {
      this.toast.error("Please fill in all required fields.");
      return;
    }

    this.isLoading$ = of(true);
    const testDto = this.testForm.value as TestDTO;

    // Map the setting values to the DTO
    const timeLimitMinutes = this.settingsForm.get("timeLimitMinutes").value;
    testDto.timeLimitMinutes = timeLimitMinutes;

    // Upload files and get their URLs
    for (const section of testDto.sections) {
      for (const question of section.questions) {
        if (
          this.QuestionUtil.isQuestionType(
            question.type.name,
            QuestionType.OPEN_QUESTION
          )
        ) {
          question.answers = question.answers = [];
        }

        const files = question.fileUrls as File[];
        const fileUrls: string[] = [];

        for (const file of files) {
          try {
            const url = await this.fileStorageService.storeFile$(
              file,
              "test-files",
              "file"
            );
            fileUrls.push(url);
          } catch (error) {
            console.error("Error uploading file:", error);
            this.toast.error("Error uploading file");
            return;
          }
        }

        question.fileUrls = fileUrls;
      }
    }

    if (this.isEditMode) {
      // Update test
      this.testService.updateTest$(this.testId, testDto).subscribe(
        () => {
          this.toast.success("Test updated successfully!");
          this.router.navigate(["/test/list"]);
          this.isLoading$ = of(false);
        },
        (error) => {
          console.error("Error updating test: ", error);
          this.toast.error("Error updating test");
          this.isLoading$ = of(false);
        }
      );
    } else {
      // Create test
      this.testService.createTest$(testDto).subscribe(
        () => {
          this.toast.success("Test created successfully!");
          this.router.navigate(["/test/list"]);
          this.isLoading$ = of(false);
        },
        (error) => {
          console.error("Error creating test: ", error);
          this.toast.error("Error creating test");
          this.isLoading$ = of(false);
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
        if (question.questionText.trim() === "" || question.type === null) {
          return false;
        }

        if (
          question.answers.length === 0 &&
          !this.QuestionUtil.isQuestionType(
            question.type.name,
            QuestionType.OPEN_QUESTION
          )
        ) {
          return false;
        }

        for (const answer of question.answers) {
          if (
            answer.answerText.trim() === "" &&
            !this.QuestionUtil.isQuestionType(
              question.type.name,
              QuestionType.OPEN_QUESTION
            )
          ) {
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

    let questionGroup;
    if (
      lastQuestionType &&
      this.QuestionUtil.isQuestionType(
        lastQuestionType.name,
        QuestionType.OPEN_QUESTION
      )
    ) {
      questionGroup = this.formBuilder.group({
        questionText: ["", Validators.required],
        type: new FormControl(lastQuestionType, Validators.required),
        answers: this.formBuilder.array([], []),
        fileUrls: this.formBuilder.array([]),
      });
    } else {
      questionGroup = this.formBuilder.group({
        questionText: ["", Validators.required],
        type: new FormControl(lastQuestionType, Validators.required),
        answers: this.formBuilder.array(
          [],
          [Validators.required, requireOneCorrectAnswer]
        ),
        fileUrls: this.formBuilder.array([]),
      });
    }

    // Add one blank answer based on the last question type
    if (lastQuestionType) {
      const answersArray = questionGroup.get("answers") as FormArray;
      if (
        this.QuestionUtil.isQuestionType(
          lastQuestionType.name,
          QuestionType.MULTIPLE_CHOICE
        )
      ) {
        answersArray.push(
          this.formBuilder.group({
            answerText: ["", Validators.required],
            isCorrect: false,
          })
        );
      } else if (
        this.QuestionUtil.isQuestionType(
          lastQuestionType.name,
          QuestionType.FILL_IN_THE_BLANK
        )
      ) {
        answersArray.push(
          this.formBuilder.group({
            answerText: ["", Validators.required],
            isCorrect: true,
          })
        );
      } else if (
        this.QuestionUtil.isQuestionType(
          lastQuestionType.name,
          QuestionType.OPEN_QUESTION
        )
      ) {
        answersArray.push(
          this.formBuilder.group({
            answerText: [""],
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
          if (
            this.QuestionUtil.isQuestionType(
              selectedType.name,
              QuestionType.MULTIPLE_CHOICE
            )
          ) {
            answersArray.push(
              this.formBuilder.group({
                answerText: ["", Validators.required],
                isCorrect: false,
              })
            );
          } else if (
            this.QuestionUtil.isQuestionType(
              selectedType.name,
              QuestionType.FILL_IN_THE_BLANK
            )
          ) {
            answersArray.push(
              this.formBuilder.group({
                answerText: ["", Validators.required],
                isCorrect: true,
              })
            );
          } else if (
            this.QuestionUtil.isQuestionType(
              selectedType.name,
              QuestionType.OPEN_QUESTION
            )
          ) {
            answersArray.push(
              this.formBuilder.group({
                answerText: [""],
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

  // Blanks (Fill In The Blank)
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

  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    const initialHeight = textarea.offsetHeight;

    textarea.style.height = "auto";

    const newHeight = textarea.scrollHeight + 2;
    textarea.style.height =
      (newHeight > initialHeight ? newHeight : initialHeight) + "px";
  }

  onAttachmentSelect(event: NgxDropzoneChangeEvent, questionGroup: FormGroup) {
    const attachments = questionGroup.get("fileUrls") as FormArray;
    for (const file of event.addedFiles) {
      attachments.push(new FormControl(file));
    }
  }

  onAttachmentRemove(file: File, questionGroup: FormGroup) {
    const attachments = questionGroup.get("fileUrls") as FormArray;
    const index = attachments.controls.findIndex(
      (control) => control.value === file
    );
    if (index !== -1) {
      attachments.removeAt(index);
    }
  }

  getAttachments(questionGroup: FormGroup): File[] {
    const attachments = questionGroup.get("fileUrls") as FormArray;
    return attachments
      ? attachments.controls.map((control) => control.value)
      : [];
  }

  getPreviewFile(file: ScansFile): File {
    if (file.type.startsWith("image/")) {
      return file;
    } else if (file.type.startsWith("audio/")) {
      return this.audioPreviewFile;
    } else {
      return this.audioPreviewFile;
    }
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
