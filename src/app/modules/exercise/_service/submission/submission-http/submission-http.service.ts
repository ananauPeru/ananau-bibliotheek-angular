import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SubmissionModel } from "src/app/shared/models/submission/submission.model";
import { SubmissionDto } from "../../../_dto/submission-dto";

@Injectable({
  providedIn: "root",
})
export class SubmissionHttpService {
  constructor() {}

  MOCK_DATA: SubmissionModel[] = [
    {
      id: 1,
      userId: 1,
      userName: "User",
      exerciseId: 1,
      exerciseName: "Exercise",
      fileUrls: ["https://www.example.com"],
      comment: "Comment",
      submissionDate: new Date(),
      gradeDate: new Date(),
      grade: 10,
      totalGrade: 10,
    },
    {
      id: 2,
      userId: 2,
      userName: "User 2",
      exerciseId: 2,
      exerciseName: "Exercise 2",
      fileUrls: ["https://www.example.com"],
      comment: "Comment",
      submissionDate: new Date(),
      gradeDate: new Date(),
      grade: 10,
      totalGrade: 10,
    },
    {
      id: 3,
      userId: 3,
      userName: "User 3",
      exerciseId: 3,
      exerciseName: "Exercise 3",
      fileUrls: ["https://www.example.com"],
      comment: "Comment",
      submissionDate: new Date(),
    },
  ];

  getSubmissions$(searchTerm: string): Observable<SubmissionModel[]> {
    return of(this.MOCK_DATA);
  }

  getAllSubmissions$(): Observable<SubmissionModel[]> {
    return of(this.MOCK_DATA);
  }

  getSubmissionsByExerciseId$(exerciseId: number): Observable<SubmissionModel[]> {
    return of(this.MOCK_DATA.filter((submission) => submission.exerciseId === exerciseId));
  }

  getSubmissionById$(submissionId: number): Observable<SubmissionModel> {
    return of(this.MOCK_DATA[submissionId - 1]);
  }

  gradeSubmission$(submissionId: number, grade: number, totalGrade: number): Observable<SubmissionModel> {
    const submission: SubmissionModel = this.MOCK_DATA[submissionId - 1];
    submission.grade = grade;
    submission.totalGrade = totalGrade;
    submission.gradeDate = new Date();
    return of(submission);
  }

  createSubmission$(submissionDto: SubmissionDto): Observable<SubmissionModel> {
    const submission: SubmissionModel = {
      id: this.MOCK_DATA.length + 1,
      userId: submissionDto.userId,
      userName: "Mock User",
      exerciseId: submissionDto.exerciseId,
      exerciseName: submissionDto.exerciseName,
      fileUrls: submissionDto.fileUrls,
      comment: submissionDto.comment,
      submissionDate: submissionDto.submissionDate,
      gradeDate: submissionDto.gradeDate,
      grade: submissionDto.grade,
      totalGrade: submissionDto.totalGrade,
    };
    this.MOCK_DATA.push(submission);
    return of(submission);
  }
}
