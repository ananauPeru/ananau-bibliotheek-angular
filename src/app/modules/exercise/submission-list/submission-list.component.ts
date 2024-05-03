import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../_service/submission/submission.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { SubmissionModel } from '../_model/submission.model';

@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent implements OnInit {

  //This page should ony be visaible to the teacher

  public submissions$: Observable<SubmissionModel[]>;
  public searchTerm$ = new Subject<string>();

  constructor(public submissionService: SubmissionService) { }

  ngOnInit() {
    this.submissions$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.submissionService.getSubmissions$(searchTerm)) // Modify the parameters as needed
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }
}