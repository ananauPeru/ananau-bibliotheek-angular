import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ContainerComponent } from "../container/container.component";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.questionsForm = this.fb.group({
      otherQuestions: [""],
      whyAnanau: [""],
      firstHeard: [""],
    });

    this.emitForm();

    // When the form is changed, the parent form is also updated
    this.questionsForm.valueChanges.subscribe(() => this.emitForm());
  }

  private emitForm() {
    this.questionsFormChange.emit(this.questionsForm);
    this.questionsFormCounted.emit(
      ContainerComponent.countFields(this.questionsForm)
    );
  }
}
