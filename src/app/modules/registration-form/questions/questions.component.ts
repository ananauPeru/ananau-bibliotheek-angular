import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ContainerComponent } from "../container/container.component";
import { FormRole } from "../models/form-role";
import { RegistrationDTO } from "src/app/shared/models/registration/registration.model";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent implements OnInit {
  @Input() public questionsForm: FormGroup;
  @Output() public questionsFormChange = new EventEmitter<FormGroup>();
  @Output() public questionsFormCounted = new EventEmitter<{
    all: number;
    required: number;
    requiredAndValid: number;
  }>();
  @Input() public role: FormRole;
  @Input() public initialData: RegistrationDTO;

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {
    this.questionsForm = this.fb.group({
      otherQuestions: [this.initialData.internDetails.otherQuestions],
      experience: [this.initialData.internDetails.experience],
      whyAnanau: [this.initialData.internDetails.whyAnanau],
      firstHeard: [this.initialData.internDetails.whereFirstHeard],
    });

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.questionsForm.valueChanges.subscribe(() => this.emitForm());
  }

  getErrorMessage(errors: ValidationErrors): string {
    return ContainerComponent.getErrorMessage(errors, this.translate);
  }

  private emitForm() {
    this.questionsFormChange.emit(this.questionsForm);
    this.questionsFormCounted.emit(
      ContainerComponent.countFields(this.questionsForm)
    );
  }
}
