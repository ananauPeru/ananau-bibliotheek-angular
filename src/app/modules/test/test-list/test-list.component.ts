import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { TestService } from "../_services/test/test.service";
import { ShortTestModel } from "../_models/test/short-test.model";
import { Observable, Subject, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { ShareModalComponent } from "../components/share-modal/share-modal.component";

@Component({
  selector: "app-test-list",
  templateUrl: "./test-list.component.html",
  styleUrls: ["./test-list.component.scss"],
})
export class TestListComponent implements OnInit {
  public tests$: Observable<ShortTestModel[]>;
  public searchTerm$ = new Subject<string>();
  public users = [
    { id: 1, fullName: 'John Doe' },
    { id: 2, fullName: 'Jane Smith' },
    { id: 3, fullName: 'Alice Johnson' },
    { id: 4, fullName: 'Bob Williams' },
    { id: 5, fullName: 'Emma Davis' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public testService: TestService
  ) {}

  ngOnInit() {
    this.tests$ = this.searchTerm$.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((searchTerm) => this.testService.getTests$(searchTerm, 1, 1000))
    );
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  openShareModal(shortTestModel: ShortTestModel) {
    const shareUrl = `${window.location.origin}/test/examination/${shortTestModel.id}?AccessCode=${shortTestModel.accessCode.code}`;
    const modalRef = this.modalService.open(ShareModalComponent, { centered: true });
    console.log(modalRef.componentInstance);
    modalRef.componentInstance.shareUrl = shareUrl;
    modalRef.componentInstance.users = this.users;
    modalRef.componentInstance.share.subscribe((selectedUsers: any[]) => {
      console.log('Selected users:', selectedUsers);
      // Perform the sharing logic here
    });
  }

}
