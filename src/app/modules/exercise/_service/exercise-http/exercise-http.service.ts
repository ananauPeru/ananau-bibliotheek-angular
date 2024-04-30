import { Injectable } from "@angular/core";
import { ExerciseModel } from "../../_model/exercise.model";
import { Observable, of } from "rxjs";

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
}
