import { Component, OnInit } from '@angular/core';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel } from '../_models/test/test-submission.model';
import { Observable, Subject } from 'rxjs';
import { AuthUtil } from "src/app/_utils/auth_util";
import { ExerciseService } from '../../exercise/_service/exercise/exercise.service';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { SubmissionTestService } from '../_services/submission-test/submission-test.service';

@Component({
  selector: 'app-overview-submission-test',
  templateUrl: './overview-submission-test.component.html',
  styleUrls: ['./overview-submission-test.component.scss']
})
export class OverviewSubmissionTestComponent implements OnInit {

  public submissionsTest$: Observable<TeacherTestSubmissionModel[] | StudentTestSubmissionModel[]>;
  public searchTerm$ = new Subject<string>();

  constructor(
    public submissionTestService: SubmissionTestService,
    public AuthUtil: AuthUtil
  ) { }

  ngOnInit(): void {
    this.submissionsTest$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.submissionTestService.getSubmissionsTest$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  getScoreAuto(submissionTest: TeacherTestSubmissionModel | StudentTestSubmissionModel): string {
    return submissionTest.realScores.totalAuto + "/" + submissionTest.possibleScores.maxAuto;
  }

  getScoreManual(submissionTest: TeacherTestSubmissionModel | StudentTestSubmissionModel): string {
    if(submissionTest.realScores.totalNotAuto != null) {
      return submissionTest.realScores.totalNotAuto + "/" + submissionTest.possibleScores.maxNotAuto;
    } else {
      return "Not graded yet"
    }
  }
}
