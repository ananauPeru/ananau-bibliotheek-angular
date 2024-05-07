import { Injectable } from '@angular/core';
import { ExerciseHttpService } from './exercise-http/exercise-http.service';
import { Observable } from 'rxjs';
import { ExerciseModel, StudentShortExerciseModel, TeacherShortExerciseModel } from '../../_model/exercise.model';
import { AuthUtil, Roles } from 'src/app/_utils/auth_util';
import { CreateExerciseDto } from '../../_dto/create-exercise-dto';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(private exerciseHttpService: ExerciseHttpService, private AuthUtil: AuthUtil) { }

  getExercises$(searchTerm: string, page: number, pageSize: number): Observable<TeacherShortExerciseModel[] | StudentShortExerciseModel[]> {
    if (this.AuthUtil.permitted(Roles.SpanishTeacher)) {
      return this.exerciseHttpService.getTeacherExercises$(searchTerm, page, pageSize);
    } else {
      return this.exerciseHttpService.getStudentExercises$(searchTerm, page, pageSize);
    }
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    if (this.AuthUtil.permitted(Roles.SpanishTeacher)) {
      return this.exerciseHttpService.getTeacherExerciseById$(id);
    } else {
      return this.exerciseHttpService.getStudentExerciseById$(id);
    }
  }

  createExercise$(createExerciseDto: CreateExerciseDto): Observable<ExerciseModel> {
    return this.exerciseHttpService.createExercise$(createExerciseDto);
  }

}
