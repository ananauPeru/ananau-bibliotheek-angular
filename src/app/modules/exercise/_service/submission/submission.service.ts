import { Injectable } from "@angular/core";
import { SubmissionHttpService } from "./submission-http/submission-http.service";
import { Observable } from "rxjs";
import { SubmissionModel } from "../../_model/submission.model";
import { CreateSubmissionDto } from "../../_dto/create-submission-dto";
import { GradeSubmissionDto } from "../../_dto/grade-submission-dto";

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

  gradeSubmission$(submissionId: number, gradeSubmissionDto: GradeSubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.gradeSubmission$(submissionId, gradeSubmissionDto);
  }

  createSubmission$(createSubmissionDto: CreateSubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.createSubmission$(createSubmissionDto);
  }
}
