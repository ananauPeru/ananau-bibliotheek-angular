import { Injectable } from "@angular/core";
import { SubmissionHttpService } from "./submission-http/submission-http.service";
import { Observable } from "rxjs";
import { SubmissionModel } from "src/app/shared/models/submission/submission.model";
import { SubmissionDto } from "../../_dto/submission-dto";

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

  gradeSubmission$(submissionId: number, grade: number, totalGrade: number): Observable<SubmissionModel> {
    return this.submissionHttpService.gradeSubmission$(submissionId, grade, totalGrade);
  }

  createSubmission$(submissionDto: SubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.createSubmission$(submissionDto);
  }
}
