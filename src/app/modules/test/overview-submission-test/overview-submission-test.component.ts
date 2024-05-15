import { Component, OnInit } from '@angular/core';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel } from '../_models/test/test-submission.model';
import { Observable } from 'rxjs';
import { AuthUtil } from "src/app/_utils/auth_util";

@Component({
  selector: 'app-overview-submission-test',
  templateUrl: './overview-submission-test.component.html',
  styleUrls: ['./overview-submission-test.component.scss']
})
export class OverviewSubmissionTestComponent implements OnInit {

  submissionTest$: Observable<TeacherTestSubmissionModel | StudentTestSubmissionModel>;
  constructor(
    public AuthUtil: AuthUtil
  ) { }

  ngOnInit(): void {
  }

}
