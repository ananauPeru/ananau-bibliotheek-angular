import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"],
})
export class QuestionsComponent implements OnInit {
  @Input() public questionsForm: FormGroup;
  @Output() public questionsFormChange = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit() {
    // When the form is changed, the parent form is also updated
    this.questionsForm.valueChanges.subscribe(() => {
      this.questionsFormChange.emit(this.questionsForm);
    });
  }
}
