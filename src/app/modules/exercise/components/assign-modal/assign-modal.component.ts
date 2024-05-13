import { Component, Inject, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { ExerciseService } from "../../_service/exercise/exercise.service";
import { AssignExerciseRequest, LearnerModel } from "../../_model/exercise.model";
import { ToastrService } from "ngx-toastr";

function futureDateValidator(control) {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return selectedDate >= currentDate ? null : { pastDate: true };
}

@Component({
  selector: "app-assign-modal",
  templateUrl: "./assign-modal.component.html",
  styleUrls: ["./assign-modal.component.scss"],
})
export class AssignModalComponent implements OnInit {
  @Input() exerciseId: number;
  @Input() learners: LearnerModel[];
  assignForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    public activeModal: NgbActiveModal,
    private toast: ToastrService,
    @Inject(NgbActiveModal) public activeModalInstance: NgbActiveModal
  ) {
    this.assignForm = this.formBuilder.group({
      deadline: this.formBuilder.control(null, [Validators.required, futureDateValidator]),
      learner: this.formBuilder.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(this.learners);
    this.learners = this.learners || [];
  }

  onAssign() {
    if (this.assignForm.invalid) {
      this.assignForm.markAllAsTouched();
      return;
    }

    const assignExerciseRequest: AssignExerciseRequest = {
      learnerId: this.assignForm.value.learner,
      exerciseId: this.exerciseId,
      deadline: this.assignForm.value.deadline,
    };

    this.exerciseService.assignExercise$(assignExerciseRequest).subscribe(
      (response) => {
        this.toast.success("Exercise assigned successfully");
        this.activeModal.close();
      },
      (error) => {
        this.toast.error("Failed to assign exercise");
        console.error(error);
      }
    );
  }
}