import { Injectable } from '@angular/core';
import { ExerciseHttpService } from './exercise-http/exercise-http.service';
import { Observable } from 'rxjs';
import { AssignExerciseRequest, AssignedExerciseModel, ExerciseModel, LearnerModel, StudentExerciseModel, StudentShortExerciseModel, TeacherShortExerciseModel, TypeModel } from '../../_model/exercise.model';
import { AuthUtil, Roles } from 'src/app/_utils/auth_util';
import { CreateExerciseDto } from '../../_dto/create-exercise-dto';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(private exerciseHttpService: ExerciseHttpService, private AuthUtil: AuthUtil) { }

  getExercises$(searchTerm: string, page: number, pageSize: number): Observable<TeacherShortExerciseModel[] | StudentShortExerciseModel[]> {
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.exerciseHttpService.getTeacherExercises$(searchTerm, page, pageSize);
    } else {
      return this.exerciseHttpService.getStudentExercises$(searchTerm, page, pageSize);
    }
  }

  getAssignedExercises$(searchTerm: string, page: number, pageSize: number): Observable<StudentShortExerciseModel[] | AssignedExerciseModel[]> {
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.exerciseHttpService.getAssignedExercises$(searchTerm, page, pageSize);
    } else {
      return this.exerciseHttpService.getStudentExercises$(searchTerm, page, pageSize);
    }
  }

  getExerciseById$(id: number): Observable<ExerciseModel | StudentExerciseModel> {
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.exerciseHttpService.getTeacherExerciseById$(id);
    } else {
      return this.exerciseHttpService.getStudentExerciseById$(id);
    }
  }

  createExercise$(createExerciseDto: CreateExerciseDto): Observable<ExerciseModel> {
    return this.exerciseHttpService.createExercise$(createExerciseDto);
  }

  assignExercise$(assignedExercise: AssignExerciseRequest): Observable<AssignExerciseRequest> {
    return this.exerciseHttpService.assignExercise$(assignedExercise);
  }

  getExerciseTypes$(): Observable<TypeModel[]> {
    return this.exerciseHttpService.getExerciseTypes$();
  }

  getLearners$(): Observable<LearnerModel[]> {
    return this.exerciseHttpService.getLearners$();
  }
}
