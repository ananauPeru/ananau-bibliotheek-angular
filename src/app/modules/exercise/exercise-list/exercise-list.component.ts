import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../_service/exercise.service';
import { Observable, Subject } from 'rxjs';
import { ExerciseModel } from '../_model/exercise.model';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  public exercises$: Observable<ExerciseModel[]>;
  public searchTerm$ = new Subject<string>();

  constructor(public exerciseService: ExerciseService) { }

  ngOnInit() {
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