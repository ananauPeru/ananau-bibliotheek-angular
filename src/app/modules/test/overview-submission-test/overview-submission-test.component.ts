import { Component, OnInit } from '@angular/core';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel } from '../_models/test/test-submission.model';
import { Observable, Subject } from 'rxjs';
import { AuthUtil } from "src/app/_utils/auth_util";

@Component({
  selector: 'app-overview-submission-test',
  templateUrl: './overview-submission-test.component.html',
  styleUrls: ['./overview-submission-test.component.scss']
})
export class OverviewSubmissionTestComponent implements OnInit {

  public submissionsTest$: Observable<TeacherTestSubmissionModel | StudentTestSubmissionModel>;
  public searchTerm$ = new Subject<string>();

  constructor(
    public AuthUtil: AuthUtil
  ) { }

  ngOnInit(): void {
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  getScoreManual(submissionTest: TeacherTestSubmissionModel | StudentTestSubmissionModel): string {
    if(submissionTest.realScores != null) {
      return submissionTest.realScores.totalAuto + "/" + submissionTest.testAttempt.possibleScores.maxAuto;
    } else {
      return "Not graded yet"
    }
  }
}
