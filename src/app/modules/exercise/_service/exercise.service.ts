import { Injectable } from '@angular/core';
import { ExerciseHttpService } from './exercise-http/exercise-http.service';
import { Observable } from 'rxjs';
import { ExerciseModel } from '../_model/exercise.model';
import { ExerciseDto } from '../_dto/exercise-dto';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

constructor(private exerciseHttpService: ExerciseHttpService) { }

  getExercises$(searchTerm: string, page: number, pageSize: number): Observable<ExerciseModel[]> {
    return this.exerciseHttpService.getExercises$(searchTerm, page, pageSize);
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    return this.exerciseHttpService.getExerciseById$(id);
  }

  createExercise$(exerciseDto: ExerciseDto): Observable<ExerciseModel> {
    return this.exerciseHttpService.createExercise$(exerciseDto);
  }
}
