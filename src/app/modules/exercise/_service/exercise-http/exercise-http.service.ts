import { Injectable } from "@angular/core";
import { ExerciseModel } from "../../_model/exercise.model";
import { Observable, of } from "rxjs";
import { ExerciseDto } from "../../_dto/exercise-dto";

@Injectable({
  providedIn: "root",
})
export class ExerciseHttpService {
  constructor() {}

  private MOCK_DATA: ExerciseModel[] = [
    {
      id: 1,
      author: "Author 1",
      title: "Exercise 1",
      description: "Description 1",
      fileUrls: ["url1", "url2"],
    },
    {
      id: 2,
      author: "Author 2",
      title: "Exercise 2",
      description: "Description 2",
      fileUrls: ["url1", "url2"],
    },
  ];

  getExercises$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<ExerciseModel[]> {
    return of(this.MOCK_DATA);
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    return of(this.MOCK_DATA.find((exercise) => exercise.id === id));
  }

  createExercise$(exerciseDto: ExerciseDto): Observable<ExerciseModel> {
    const newExercise: ExerciseModel = {
      id: this.MOCK_DATA.length + 1,
      title: exerciseDto.title,
      author: exerciseDto.author,
      description: exerciseDto.description,
      fileUrls: exerciseDto.fileUrls,
    };
    this.MOCK_DATA.push(newExercise);
    return of(newExercise);
  }
}
