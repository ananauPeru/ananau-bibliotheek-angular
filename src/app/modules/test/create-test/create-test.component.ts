import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { TestDTO } from "../_dto/test-dto";
import { SectionDTO } from "../_dto/section-dto";
import { QuestionDTO } from "../_dto/question-dto";
import { QuestionTypeService } from "../_services/question-type/question-type.service";
import { Observable } from "rxjs";
import { QuestionTypeModel } from "../_models/question-type/question-type.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-create-test",
  templateUrl: "./create-test.component.html",
  styleUrls: ["./create-test.component.scss"],
})
export class CreateTestComponent implements OnInit {
  @ViewChild("settingsModal") settingsModal: TemplateRef<any>;

  public testForm: FormGroup;
  public questionTypes$: Observable<QuestionTypeModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private questionTypeService: QuestionTypeService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initializeQuestionTypes();
    this.initializeForm();
  }

  private initializeForm() {
    this.testForm = this.formBuilder.group({
      title: "",
      timeLimitMinutes: 60,
      sections: this.formBuilder.array([]),
    });

    this.addSection();
  }

  private initializeQuestionTypes() {
    this.questionTypes$ = this.questionTypeService.getQuestionTypes$();
  }

  get sections(): FormArray {
    return this.testForm.get("sections") as FormArray;
  }

  addSection() {
    const sectionGroup = this.formBuilder.group({
      title: "",
      questions: this.formBuilder.array([]),
    });
    this.sections.push(sectionGroup);
    this.addQuestion(sectionGroup);
  }

  addQuestion(sectionGroup: FormGroup) {
    const questionsArray = sectionGroup.get("questions") as FormArray;
    const questionGroup = this.formBuilder.group({
      questionText: "",
      type: new FormControl(null),
      answers: this.formBuilder.array([]),
    });
    questionsArray.push(questionGroup);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  removeQuestion(sectionGroup: FormGroup, questionIndex: number) {
    const questionsArray = sectionGroup.get("questions") as FormArray;
    questionsArray.removeAt(questionIndex);
  }

  removeOption(questionGroup: FormGroup, optionIndex: number) {
    const optionsArray = questionGroup.get("answers") as FormArray;
    optionsArray.removeAt(optionIndex);
  }

  addOption(questionGroup: FormGroup) {
    const optionsArray = questionGroup.get("answers") as FormArray;
    optionsArray.push(
      this.formBuilder.group({
        answerText: "",
        isCorrect: false,
      })
    );
  }

  addBlank(questionGroup: FormGroup) {
    const answersArray = questionGroup.get("answers") as FormArray;
    answersArray.push(
      this.formBuilder.group({
        answerText: "",
      })
    );
  }

  removeBlank(questionGroup: FormGroup, blankIndex: number) {
    const answersArray = questionGroup.get("answers") as FormArray;
    answersArray.removeAt(blankIndex);
  }

  onSubmit() {
    const testDto = this.testForm.value as TestDTO;
    console.log(testDto);
  }

  openSettingsModal() {
    this.modalService.open(this.settingsModal, { centered: true });
  }

}
