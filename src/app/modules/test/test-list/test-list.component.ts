import { Component, OnInit } from "@angular/core";
import { TestService } from "../_services/test/test.service";
import { ShortTestModel } from "../_models/test/short-test.model";
import { Observable, Subject } from "rxjs";
import { debounceTime, startWith, switchMap } from "rxjs/operators";

@Component({
  selector: "app-test-list",
  templateUrl: "./test-list.component.html",
  styleUrls: ["./test-list.component.scss"],
})
export class TestListComponent implements OnInit {
  tests$: Observable<ShortTestModel[]>;
  searchTerm$ = new Subject<string>();

  constructor(public testService: TestService) {}

  ngOnInit() {
    this.tests$ = this.searchTerm$.pipe(
      startWith(""),
      debounceTime(1000),
      switchMap((searchTerm) => this.testService.getTests$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }
}