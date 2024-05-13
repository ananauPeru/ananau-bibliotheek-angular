import { Injectable } from "@angular/core";
import { SubmissionHttpService } from "./submission-http/submission-http.service";
import { Observable } from "rxjs";
import { StudentShortSubmissionModel, StudentSubmissionModel, SubmissionResultModel, TeacherShortSubmissionModel, TeacherSubmissionModel } from "../../_model/submission.model";
import { CreateSubmissionDto } from "../../_dto/create-submission-dto";
import { AuthUtil, Roles } from "src/app/_utils/auth_util";
import { GradeSubmissionDto } from "../../_dto/grade-submission-dto";

@Injectable({
  providedIn: "root",
})
export class SubmissionService {
  constructor(private submissionHttpService: SubmissionHttpService, private AuthUtil: AuthUtil) {}

  
  getSubmissions$(searchTerm: string, page: number, pageSize: number): Observable<StudentShortSubmissionModel[] | TeacherShortSubmissionModel[]> {
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.submissionHttpService.getTeacherSubmissions$(searchTerm, page, pageSize);
    }
    return this.submissionHttpService.getStudentSubmissions$(searchTerm, page, pageSize);
  }

  getSubmissionById$(id: number): Observable<StudentSubmissionModel | TeacherSubmissionModel> { 
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.submissionHttpService.getTeacherSubmissionById$(id);
    }
    return this.submissionHttpService.getStudentSubmissionById$(id);
  }

  createSubmission$(id: number, createSubmissionDto: CreateSubmissionDto): Observable<SubmissionResultModel> {
    return this.submissionHttpService.createSubmission$(id, createSubmissionDto);
  }

  gradeSubmission$(id: number, gradeSubmissionDto: GradeSubmissionDto): Observable<boolean> {
    return this.submissionHttpService.gradeSubmission$(id, gradeSubmissionDto);
  }

}
