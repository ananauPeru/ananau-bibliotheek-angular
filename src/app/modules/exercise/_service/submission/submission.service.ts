import { Injectable } from "@angular/core";
import { SubmissionHttpService } from "./submission-hhtp/submission-http.service";
import { Observable } from "rxjs";
import { SubmissionModel } from "src/app/shared/models/submission/submission.model";
import { SubmissionDto } from "../../_dto/submission-dto";

@Injectable({
  providedIn: "root",
})
export class SubmissionService {
  constructor(private submissionHttpService: SubmissionHttpService) {}

  getSubmissions$(
    exerciseId: number,
    userId: number
  ): Observable<SubmissionModel[]> {
    return this.submissionHttpService.getSubmissions$(exerciseId, userId);
  }

  createSubmission$(submissionDto: SubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.createSubmission$(submissionDto);
  }
}
