import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../_service/exercise/exercise.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { AuthUtil } from 'src/app/_utils/auth_util';
import { TeacherShortExerciseModel } from '../_model/exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
/**
 * This page is only available for the Teacher role.
 */
export class ExerciseListComponent implements OnInit {
  public exercises$: Observable<TeacherShortExerciseModel[]>;
  public searchTerm$ = new Subject<string>();

  constructor(public exerciseService: ExerciseService, public AuthUtil: AuthUtil) { }

  ngOnInit() {
    console.log("Fetching exercises")
    this.exercises$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.exerciseService.getExercises$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

}
