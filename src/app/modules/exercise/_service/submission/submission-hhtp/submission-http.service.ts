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
      exerciseId: 1,
      fileUrls: ["http://example.com/submission1.pdf"],
      comment: "First submission",
      submissionDate: new Date("2023-05-20"),
      gradeDate: new Date("2023-05-22"),
      grade: 5,
      totalGrade: 10,
    },
    {
      id: 2,
      userId: 1,
      exerciseId: 1,
      fileUrls: ["http://example.com/submission2.pdf"],
      comment: "Second submission",
      submissionDate: new Date("2023-05-22"),
    },
  ];

  getSubmissions$(
    exerciseId: number,
    userId: number
  ): Observable<SubmissionModel[]> {
    return of(this.MOCK_DATA);
  }

  createSubmission$(submissionDto: SubmissionDto): Observable<SubmissionModel> {
    const submission: SubmissionModel = {
      id: this.MOCK_DATA.length + 1,
      userId: submissionDto.userId,
      exerciseId: submissionDto.exerciseId,
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
