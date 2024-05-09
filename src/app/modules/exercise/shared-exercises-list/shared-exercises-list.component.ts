import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../_service/exercise/exercise.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { AuthUtil } from 'src/app/_utils/auth_util';
import { AssignedExerciseModel, StudentShortExerciseModel } from '../_model/exercise.model';

@Component({
  selector: 'app-shared-exercises-list',
  templateUrl: './shared-exercises-list.component.html',
  styleUrls: ['./shared-exercises-list.component.scss']
})
export class SharedExercisesListComponent implements OnInit {
  public exercises$: Observable<StudentShortExerciseModel[] | AssignedExerciseModel[]>;
  public searchTerm$ = new Subject<string>();

  public ExerciseStatus = ExerciseStatus;

  constructor(public exerciseService: ExerciseService, public AuthUtil: AuthUtil) { }

  ngOnInit() {
    this.exercises$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.exerciseService.getAssignedExercises$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }


  getStatus(exercise: StudentShortExerciseModel | AssignedExerciseModel): ExerciseStatus {
    if(exercise.type.id === 2) {
      return ExerciseStatus.NotAvailable
    }
    return ExerciseStatus.Assigned
  }

  getGradeText(exercise: StudentShortExerciseModel | AssignedExerciseModel): string {
    if(exercise.type.id === 2) {
      return "Not available"
    }
    if(exercise.grade != null) {
      return exercise.grade + "/" + exercise.maxGrade;
    } else {
      return "Not graded yet"
    }
  }

  getGradedByText(exercise: StudentShortExerciseModel | AssignedExerciseModel): string {
    if(exercise.type.id === 2) {
      return "Not available"
    }
    if(exercise.grade != null) {
      return exercise.gradedBy.firstName + " " + exercise.gradedBy.lastName;
    } else {
      return "Not graded yet"
    }
  }

}

export enum ExerciseStatus {
  Assigned = 'Assigned',
  Submitted = 'Submitted',
  Graded = 'Graded',
  NotAvailable = 'Not available'
}
