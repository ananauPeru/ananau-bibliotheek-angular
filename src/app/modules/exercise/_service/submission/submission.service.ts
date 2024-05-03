import { Injectable } from "@angular/core";
import { SubmissionHttpService } from "./submission-http/submission-http.service";
import { Observable } from "rxjs";
import { SubmissionDto } from "../../_dto/submission-dto";
import { SubmissionModel } from "../../_model/submission.model";

@Injectable({
  providedIn: "root",
})
export class SubmissionService {
  constructor(private submissionHttpService: SubmissionHttpService) {}

  getSubmissions$(searchTerm: string): Observable<SubmissionModel[]> {
    return this.submissionHttpService.getSubmissions$(searchTerm);
  }

  getSubmissionsByExerciseId$(exerciseId: number): Observable<SubmissionModel[]> {
    return this.submissionHttpService.getSubmissionsByExerciseId$(exerciseId);
  }

  getSubmissionById$(submissionId: number): Observable<SubmissionModel> {
    return this.submissionHttpService.getSubmissionById$(submissionId);
  }

  getSubmissionsByUserIdAndExerciseId$(userId: number, exerciseId: number): Observable<SubmissionModel[]> {
    return this.submissionHttpService.getSubmissionsByUserIdAndExerciseId$(userId, exerciseId);
  }

  gradeSubmission$(submissionId: number, grade: number, feedback: string): Observable<SubmissionModel> {
    return this.submissionHttpService.gradeSubmission$(submissionId, grade, feedback);
  }

  createSubmission$(submissionDto: SubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.createSubmission$(submissionDto);
  }
}
