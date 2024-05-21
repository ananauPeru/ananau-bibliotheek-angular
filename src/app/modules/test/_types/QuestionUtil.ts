import { QuestionType } from "./QuestionType";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class QuestionUtil {
  public types = QuestionType;

  public fromString(input: string): QuestionType | undefined {
    const normalizedInput = input.replace(/\s/g, "").toUpperCase();
    const values = Object.values(QuestionType);

    for (const value of values) {
      if (
        value.toString().replace(/\s/g, "").toUpperCase() === normalizedInput
      ) {
        return value;
      }
    }

    return undefined;
  }

  public isQuestionType(input: string, type: QuestionType): boolean {
    return this.fromString(input) === type;
  }

  public isQuestionTypeIgnoreCase(input: string, type: QuestionType): boolean {
    const normalizedInput = input.replace(/_/g, " ").toLocaleLowerCase();
    const normalizedType = type.toString().toLocaleLowerCase();
    return normalizedInput === normalizedType;
  }
}
