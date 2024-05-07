import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../_service/submission/submission.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { StudentShortSubmissionModel, TeacherShortSubmissionModel } from '../_model/submission.model';
import { AuthUtil } from 'src/app/_utils/auth_util';

@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent implements OnInit {

  public submissions$: Observable<StudentShortSubmissionModel[] | TeacherShortSubmissionModel[]>;
  public searchTerm$ = new Subject<string>();

  constructor(public submissionService: SubmissionService, public AuthUtil: AuthUtil) { }

  ngOnInit() {
    this.submissions$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.submissionService.getSubmissions$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }


  getGradeText(submission: StudentShortSubmissionModel | TeacherShortSubmissionModel): string {
    if(submission.grade != null) {
      return submission.grade + "/" + submission.exercise.maxGrade;
    } else {
      return "-/-"
    }
  }
}