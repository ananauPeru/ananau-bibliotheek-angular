import { Injectable } from "@angular/core";
import { ExerciseModel } from "../../../_model/exercise.model";
import { Observable, of } from "rxjs";
import { ExerciseDto } from "../../../_dto/exercise-dto";

@Injectable({
  providedIn: "root",
})
export class ExerciseHttpService {
  constructor() {
    this.MOCK_DATA = [
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
  }

  private MOCK_DATA: ExerciseModel[];

  getExercises$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<ExerciseModel[]> {
    return of(this.MOCK_DATA);
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    return of(this.MOCK_DATA[id - 1]);
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
