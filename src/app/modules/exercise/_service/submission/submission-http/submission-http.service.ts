import { Injectable, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { SubmissionDto } from "../../../_dto/submission-dto";
import { SubmissionModel } from "../../../_model/submission.model";

@Injectable({
  providedIn: "root",
})
export class SubmissionHttpService {
  constructor() {
    
  }

  MOCK_DATA: SubmissionModel[] = [
    {
      id: 1,
      userId: 1,
      userName: "Mock User",
      exerciseId: 1,
      exerciseName: "Mock Exercise",
      fileUrls: ["http://example.com/file1.pdf", "http://example.com/file2.pdf"],
      comment: "Mock comment",
      submissionDate: new Date(),
      gradeDate: new Date(),
      grade: 0,
      maxGrade: 10,
      feedback: "Mock feedback",
    }
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

  gradeSubmission$(submissionId: number, grade: number, feedback: string): Observable<SubmissionModel> {
    const submission: SubmissionModel = this.MOCK_DATA[submissionId - 1];
    submission.grade = grade;
    submission.gradeDate = new Date();
    submission.feedback = feedback;
    return of(submission);
  }

  getSubmissionsByUserIdAndExerciseId$(userId: number, exerciseId: number): Observable<SubmissionModel[]> {
    return of(this.MOCK_DATA.filter((submission) => submission.userId === userId && submission.exerciseId === exerciseId));
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
      maxGrade: submissionDto.maxGrade,
      feedback: submissionDto.feedback,
    };
    this.MOCK_DATA.push(submission);
    return of(submission);
  }
}
