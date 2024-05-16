import { Injectable } from '@angular/core';
import { AuthUtil, Roles } from "src/app/_utils/auth_util";
import { SubmissionTestHttpService } from "./submission-test-http/submission-test-http.service";
import { StudentTestSubmissionModel, TeacherTestSubmissionModel, TestSubmissionModel } from '../../_models/test/test-submission.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubmissionTestService {

  constructor(private SubmissionTestHttpService: SubmissionTestHttpService, private AuthUtil: AuthUtil) { }

  getSubmissionsTest$(searchTerm: string, page: number, pageSize: number): Observable<TeacherTestSubmissionModel[] | StudentTestSubmissionModel[]> {
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.SubmissionTestHttpService.getTeacherSubmissionsTest$(searchTerm, page, pageSize);
    }
    return this.SubmissionTestHttpService.getStudentSubmissionsTest$(searchTerm, page, pageSize);
  }

  getSubmissionTestById$(id: number): Observable<TestSubmissionModel> {
    if (this.AuthUtil.permitted([Roles.SuperAdmin, Roles.SpanishTeacher])) {
      return this.SubmissionTestHttpService.getTeacherSubmissionTestById$(id);
    }
    return this.SubmissionTestHttpService.getStudentSubmissionTestById$(id);
  }
}
