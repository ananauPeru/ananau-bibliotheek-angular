import { Injectable } from "@angular/core";
import { QuestionTypeHttpService } from "./question-type-http/question-type-http.service";
import { Observable } from "rxjs";
import { QuestionTypeModel } from "../../_models/question-type/question-type.model";

@Injectable({
  providedIn: "root",
})
export class QuestionTypeService {
  constructor(private questionTypeHttpService: QuestionTypeHttpService) {}

  getQuestionTypes$(): Observable<QuestionTypeModel[]> {
    return this.questionTypeHttpService.getQuestionTypes$();
  }

  createQuestionType$(name: string): Observable<QuestionTypeModel> {
    return this.questionTypeHttpService.createQuestionType$(name);
  }

  deleteQuestionType$(id: number): Observable<boolean> {
    return this.questionTypeHttpService.deleteQuestionType$(id);
  }
}
