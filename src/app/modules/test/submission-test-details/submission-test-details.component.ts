import { Component, OnInit } from '@angular/core';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel } from '../_models/test/test-submission.model';
import { Observable } from 'rxjs';
import { AuthUtil } from "src/app/_utils/auth_util";

@Component({
  selector: 'app-submission-test-details',
  templateUrl: './submission-test-details.component.html',
  styleUrls: ['./submission-test-details.component.scss']
})
export class SubmissionTestDetailsComponent implements OnInit {
    //The grading part of this page, should only be visable to the teacher

    submissionTest$: Observable<TeacherTestSubmissionModel | StudentTestSubmissionModel>;

  constructor(
    public AuthUtil: AuthUtil,
  ) { }

  ngOnInit(): void {
  }

}
