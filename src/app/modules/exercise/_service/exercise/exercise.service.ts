import { Injectable } from '@angular/core';
import { ExerciseHttpService } from './exercise-http/exercise-http.service';
import { Observable } from 'rxjs';
import { ExerciseModel } from '../../_model/exercise.model';
import { ShortExerciseModel } from '../../_model/short-exercise.model';
import { CreateExerciseDto } from '../../_dto/create-exercise-dto';
import { AuthUtil, Roles } from 'src/app/_utils/auth_util';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(private exerciseHttpService: ExerciseHttpService, private AuthUtil: AuthUtil) { }

  getExercises$(searchTerm: string, page: number, pageSize: number): Observable<ShortExerciseModel[]> {
    const isTeacher = this.AuthUtil.permitted([Roles.SpanishTeacher, Roles.SuperAdmin]);
    return this.exerciseHttpService.getExercises$(searchTerm, page, pageSize, isTeacher ? Roles.SpanishTeacher : Roles.SpanishLearner);
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    return this.exerciseHttpService.getExerciseById$(id);
  }

  createExercise$(exerciseDto: CreateExerciseDto): Observable<ExerciseModel> {
    return this.exerciseHttpService.createExercise$(exerciseDto);
  }
}
