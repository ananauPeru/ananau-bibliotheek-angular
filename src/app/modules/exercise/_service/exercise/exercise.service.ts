import { Injectable } from '@angular/core';
import { ExerciseHttpService } from './exercise-http/exercise-http.service';
import { Observable } from 'rxjs';
import { ExerciseModel, StudentShortExerciseModel, TeacherShortExerciseModel } from '../../_model/exercise.model';
import { AuthUtil, Roles } from 'src/app/_utils/auth_util';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(private exerciseHttpService: ExerciseHttpService, private AuthUtil: AuthUtil) { }

  getExercises$(): Observable<TeacherShortExerciseModel[] | StudentShortExerciseModel[]> {
    if (this.AuthUtil.permitted(Roles.SpanishTeacher)) {
      return this.exerciseHttpService.getTeacherExercises$();
    } else {
      return this.exerciseHttpService.getStudentExercises$();
    }
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    if (this.AuthUtil.permitted(Roles.SpanishTeacher)) {
      return this.exerciseHttpService.getTeacherExerciseById$(id);
    } else {
      return this.exerciseHttpService.getStudentExerciseById$(id);
    }
  }

  createExercise$(exercise: ExerciseModel): Observable<ExerciseModel> {
    return this.exerciseHttpService.createExercise$(exercise);
  }

}
