import { Injectable } from "@angular/core";
import {
  TestEvaluatedModel,
  TestModel,
  TestSubmitDTO,
} from "../../../_models/test/test.model";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { TestDTO } from "../../../_dto/test-dto";
import { QuestionModel } from "../../../_models/test/question.model";
import { SectionModel } from "../../../_models/test/section.model";
import { ShortTestModel } from "../../../_models/test/short-test.model";
import { DateUtil } from "src/app/_utils/date_util";
import { QuestionUtil } from "../../../_types/QuestionUtil";
import { QuestionType } from "../../../_types/QuestionType";

const API_URL = `${environment.apiUrl}/spanish_platform/test`;

@Injectable({
  providedIn: "root",
})
export class TestHttpService {
  constructor(private http: HttpClient, private dateUtil: DateUtil, 
    private questionUtil: QuestionUtil) {}

  getTests$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<ShortTestModel[]> {
    return this.http
      .get<ShortTestModel[]>(
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
        map((response: any): ShortTestModel[] => {
          if (response.success) {
            const tests: ShortTestModel[] = response.tests;

            // Calculate and set the latestVersionNumber for each ShortTestModel
            tests.forEach((test) => {
              test.versions.forEach((version) => {
                version.createdAt = this.dateUtil.utcToPeruvianDate(
                  version.createdAt
                );
              });
              test.latestVersion = test.versions.reduce((prev, current) =>
                prev.versionNumber > current.versionNumber ? prev : current
              );
            });

            return tests;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getTestById$(id: number, versionNumber: number): Observable<TestModel> {
    return this.http
      .get<TestModel>(`${API_URL}/${id}/version/${versionNumber}`)
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
              description: test.description,
              versionNumber: test.versionNumber,
              totalAmountOfQuestions: test.totalAmountOfQuestions,
              totalAmountOfSections: test.totalAmountOfSections,
              timeLimitMinutes: test.timeLimitMinutes,
              accessCode: {
                code: test.accessCode.code,
              },
              createdAt: this.dateUtil.utcToPeruvianDate(test.createdAt),

              sections: test.sections.map((section: SectionModel) => ({
                id: section.id,
                title: section.title,
                description: test.description,
                amountOfQuestions: section.amountOfQuestions,

                questions: section.questions.map((question: QuestionModel) => ({
                  id: question.id,
                  questionText: question.questionText,
                  type: {
                    id: question.type.id,
                    name: question.type.name,
                  },
                  fileUrls: question.fileUrls,
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

  getLatestTestVersionById$(id: number): Observable<TestModel> {
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
          const latestVersion = test.versions[test.versions.length - 1];
          return {
            id: test.id,
            title: latestVersion.title,
            description: latestVersion.description,
            versionNumber: latestVersion.versionNumber,
            totalAmountOfQuestions: latestVersion.totalAmountOfQuestions,
            totalAmountOfSections: latestVersion.totalAmountOfSections,
            timeLimitMinutes: latestVersion.timeLimitMinutes,
            accessCode: {
              code: test.accessCode.code,
            },
            createdAt: this.dateUtil.utcToPeruvianDate(latestVersion.createdAt),
            sections: latestVersion.sections.map((section: SectionModel) => ({
              id: section.id,
              title: section.title,
              description: section.description,
              amountOfQuestions: section.amountOfQuestions,
              questions: section.questions.map((question: QuestionModel) => ({
                id: question.id,
                questionText: question.questionText,
                type: {
                  id: question.type.id,
                  name: question.type.name,
                },

                fileUrls: question.fileUrls,
                amountOfAnswers: question.amountOfAnswers,
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
      .get<TestModel>(`${API_URL}/examination/${id}?AccessCode=${accessCode}`)
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
            const returnValue: TestModel = {
              id: test.id,
              title: test.title,
              description: test.description,
              versionNumber: test.versionNumber,
              totalAmountOfQuestions: test.totalAmountOfQuestions,
              totalAmountOfSections: test.totalAmountOfSections,
              timeLimitMinutes: test.timeLimitMinutes,
              accessCode: {
                code: null,
              },
              createdAt: this.dateUtil.utcToPeruvianDate(test.createdAt),
              sections:
                test.sections &&
                test.sections.map((section: SectionModel) => ({
                  id: section.id,
                  title: section.title,
                  description: section.description,
                  amountOfQuestions: section.questions
                    ? section.questions.length
                    : 0,
                  questions:
                    section.questions &&
                    section.questions.map((question: QuestionModel) => ({
                      id: question.id,
                      questionText: question.questionText,
                      type: {
                        id: question.type.id,
                        name: question.type.name,
                      },
                      fileUrls: question.fileUrls,
                      amountOfAnswers: question.amountOfAnswers,
                      answers:
                        question.answers &&
                        question.answers.map((answer) => ({
                          id: answer.id,
                          answerText: answer.answerText,
                        })),
                    })),
                })),
            };
            return this.shuffleAnswersForTest(returnValue);
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  private shuffleAnswersForTest(test: TestModel): TestModel {
    test.sections.forEach((section: SectionModel) => {
      section.questions.filter((question: QuestionModel) => {
        return this.questionUtil.isQuestionTypeIgnoreCase(question.type.name, QuestionType.MULTIPLE_CHOICE);
      }).forEach((question: QuestionModel) => {
        // Shuffle the answers array using Fisher-Yates algorithm
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
        }
      });
    });
    return test;
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
            description: test.description,
            versionNumber: test.versionNumber,
            totalAmountOfQuestions: test.totalAmountOfQuestions,
            totalAmountOfSections: test.totalAmountOfSections,
            timeLimitMinutes: test.timeLimitMinutes,
            accessCode: {
              code: test.accessCode.code,
            },
            createdAt: this.dateUtil.utcToPeruvianDate(test.createdAt),

            sections: test.sections.map((section: SectionModel) => ({
              id: section.id,
              title: section.title,
              description: test.description,
              amountOfQuestions: section.questions.length,

              questions: section.questions.map((question: QuestionModel) => ({
                id: question.id,
                questionText: question.questionText,
                type: {
                  id: question.type.id,
                  name: question.type.name,
                },

                fileUrls: question.fileUrls,
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

  deleteTest$(id: number): Observable<boolean> {
    return this.http.delete(`${API_URL}/${id}`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any) => {
        if (response.success) {
          return true;
        } else {
          throwError(response.error);
          return false;
        }
      })
    );
  }

  putTest$(id: number, testDto: TestDTO): Observable<TestModel> {
    return this.http.put<any>(`${API_URL}/${id}`, testDto).pipe(
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
            description: test.description,
            versionNumber: test.versionNumber,
            totalAmountOfQuestions: test.totalAmountOfQuestions,
            totalAmountOfSections: test.totalAmountOfSections,
            timeLimitMinutes: test.timeLimitMinutes,
            accessCode: {
              code: test.accessCode.code,
            },
            createdAt: this.dateUtil.utcToPeruvianDate(test.createdAt),

            sections: test.sections.map((section: SectionModel) => ({
              id: section.id,
              title: section.title,
              description: section.description,
              amountOfQuestions: section.questions.length,

              questions: section.questions.map((question: QuestionModel) => ({
                id: question.id,
                questionText: question.questionText,
                type: {
                  id: question.type.id,
                  name: question.type.name,
                },

                fileUrls: question.fileUrls,
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

  submitTest$(
    testId: number,
    testSubmitDto: TestSubmitDTO
  ): Observable<TestEvaluatedModel> {
    console.log(testId);
    return this.http
      .post<TestEvaluatedModel>(
        `${API_URL}/examination/${testId}/submit`,
        testSubmitDto
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TestEvaluatedModel => {
          if (response.success) {
            return response.results;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }
}
