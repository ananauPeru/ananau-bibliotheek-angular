import { Injectable } from "@angular/core";
import { TestModel } from "../../../_models/test/test.model";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { TestDTO } from "../../../_dto/test-dto";
import { QuestionModel } from "../../../_models/test/question.model";
import { SectionModel } from "../../../_models/test/section.model";

const API_URL = `${environment.apiUrl}/spanish_platform/test`;

@Injectable({
  providedIn: "root",
})
export class TestHttpService {
  constructor(private http: HttpClient) {}

  getTests$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<TestModel[]> {
    return this.http
      .get<TestModel[]>(
        `${API_URL}?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
        {
          responseType: "json",
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TestModel[] => {
          if (response.success) {
            return response.tests;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getTestById$(id: number): Observable<TestModel> {
    return this.http.get<TestModel>(`${API_URL}/${id}`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): TestModel => {
        if (response.success) {
          const test = response.test;
          return {
            id: test.id,
            title: test.title,
            amountOfQuestions: test.amountOfQuestions,
            amountOfSections: test.amountOfSections,
            timeLimitMinutes: test.timeLimitMinutes,
            accessCode: {
              code: test.accessCode.code,
            },
            createdAt: new Date(test.createdAt),

            sections: test.sections.map((section: SectionModel) => ({
              id: section.id,
              title: section.title,
              amountOfQuestions: section.amountOfQuestions,

              questions: section.questions.map((question: QuestionModel) => ({
                id: question.id,
                questionText: question.questionText,
                type: {
                  id: question.type.id,
                  name: question.type.name,
                },
                amountOfAnswers: question.answers.length,
                answers: question.answers.map((answer) => ({
                  id: answer.id,
                  answerText: answer.answerText,
                  isCorrect: answer.isCorrect,
                })),
              })),
            })),
          };
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  getTestExaminationById$(
    id: number,
    accessCode: string
  ): Observable<TestModel> {
    return this.http
      .get<TestModel>(`${API_URL}/examination/${id}?accessCode=${accessCode}`)
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TestModel => {
          if (response.success) {
            const test = response.test;
            return {
              id: test.id,
              title: test.title,
              amountOfQuestions: test.amountOfQuestions,
              amountOfSections: test.amountOfSections,
              timeLimitMinutes: test.timeLimitMinutes,
              accessCode: {
                code: test.accessCode.code,
              },
              createdAt: new Date(test.createdAt),

              sections: test.sections.map((section: SectionModel) => ({
                id: section.id,
                title: section.title,
                amountOfQuestions: section.questions.length,

                questions: section.questions.map((question: QuestionModel) => ({
                  id: question.id,
                  questionText: question.questionText,
                  type: {
                    id: question.type.id,
                    name: question.type.name,
                  },
                  amountOfAnswers: question.amountOfAnswers,
                  answers: question.answers.map((answer) => ({
                    id: answer.id,
                    answerText: answer.answerText,
                  })),
                })),
              })),
            };
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  postTest$(testDto: TestDTO): Observable<TestModel> {
    return this.http.post<any>(API_URL, testDto).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): TestModel => {
        if (response.success) {
          const test = response.test;
          return {
            id: test.id,
            title: test.title,
            amountOfQuestions: test.amountOfQuestions,
            amountOfSections: test.amountOfSections,
            timeLimitMinutes: test.timeLimitMinutes,
            accessCode: {
              code: test.accessCode.code,
            },
            createdAt: new Date(test.createdAt),

            sections: test.sections.map((section: SectionModel) => ({
              id: section.id,
              title: section.title,
              amountOfQuestions: section.questions.length,

              questions: section.questions.map((question: QuestionModel) => ({
                id: question.id,
                questionText: question.questionText,
                type: {
                  id: question.type.id,
                  name: question.type.name,
                },
                amountOfAnswers: question.answers.length,
                answers: question.answers.map((answer) => ({
                  id: answer.id,
                  answerText: answer.answerText,
                  isCorrect: answer.isCorrect,
                })),
              })),
            })),
          };
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  deleteTest$(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any) => {
        if (response.success) {
          return response;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }
}
