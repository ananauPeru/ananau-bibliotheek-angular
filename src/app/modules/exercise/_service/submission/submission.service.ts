import { Injectable } from "@angular/core";
import { SubmissionHttpService } from "./submission-http/submission-http.service";
import { Observable } from "rxjs";
import { SubmissionModel } from "../../_model/submission.model";
import { CreateSubmissionDto } from "../../_dto/create-submission-dto";
import { GradeSubmissionDto } from "../../_dto/grade-submission-dto";
import { AuthUtil, Roles } from "src/app/_utils/auth_util";

@Injectable({
  providedIn: "root",
})
export class SubmissionService {
  constructor(private submissionHttpService: SubmissionHttpService, private AuthUtil: AuthUtil) {}

  getSubmissions$(searchTerm: string): Observable<SubmissionModel[]> {
    const isTeacher = this.AuthUtil.permitted([this.AuthUtil.roles.SpanishTeacher]);
    return this.submissionHttpService.getSubmissions$(searchTerm, isTeacher ? Roles.SpanishTeacher : Roles.SpanishLearner);
  }

  getSubmissionsByExerciseId$(exerciseId: number): Observable<SubmissionModel[]> {
    const isTeacher = this.AuthUtil.permitted([this.AuthUtil.roles.SpanishTeacher]);
    return this.submissionHttpService.getSubmissionsByExerciseId$(exerciseId, isTeacher ? Roles.SpanishTeacher : Roles.SpanishLearner);
  }

  getSubmissionById$(submissionId: number): Observable<SubmissionModel> {
    return this.submissionHttpService.getSubmissionById$(submissionId);
  }

  gradeSubmission$(submissionId: number, gradeSubmissionDto: GradeSubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.gradeSubmission$(submissionId, gradeSubmissionDto);
  }

  createSubmission$(createSubmissionDto: CreateSubmissionDto): Observable<SubmissionModel> {
    return this.submissionHttpService.createSubmission$(createSubmissionDto);
  }
}
