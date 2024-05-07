import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../_service/exercise/exercise.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { ShortExerciseModel } from '../_model/short-exercise.model';
import { AuthUtil } from 'src/app/_utils/auth_util';
import { ShortSharedExerciseModel } from '../_model/short-shared-exercise.model';

@Component({
  selector: 'app-shared-exercises-list',
  templateUrl: './shared-exercises-list.component.html',
  styleUrls: ['./shared-exercises-list.component.scss']
})
export class SharedExercisesListComponent implements OnInit {
  public exercises$: Observable<ShortSharedExerciseModel[]>;
  public searchTerm$ = new Subject<string>();

  public ExerciseStatus = ExerciseStatus;

  constructor(public exerciseService: ExerciseService, public AuthUtil: AuthUtil) { }

  ngOnInit() {
    this.exercises$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.exerciseService.getExercisesSharedWithUser$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }


  getStatusFromGrade(exercise: ShortSharedExerciseModel): ExerciseStatus {
    if(exercise.submission != null && exercise.submission.grade != null) {
      return ExerciseStatus.Graded;
    } else if(exercise.submission != null) {
      return ExerciseStatus.Submitted;
    }
    return ExerciseStatus.Shared;
  }
  getGradeText(exercise: ShortSharedExerciseModel): string {
    if(exercise.submission != null && exercise.submission.grade != null) {
      return `${exercise.submission.grade} / ${exercise.maxGrade}`;
    } else if(exercise.submission != null) {
      return "Not graded yet"
    }
    return "Not submitted yet"
  }

  getGradedByText(exercise: ShortSharedExerciseModel): string {
    if(exercise.submission != null && exercise.submission.grade != null) {
      return exercise.submission.gradedBy.firstName + " " + exercise.submission.gradedBy.lastName;
    } else if(exercise.submission != null) {
      return "Not graded yet"
    }
    return "Not submitted yet"
  }

}

export enum ExerciseStatus {
  Shared = 'Shared',
  Submitted = 'Submitted',
  Graded = 'Graded',
}
