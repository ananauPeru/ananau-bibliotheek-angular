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

@Component({
  selector: "app-test-list",
  templateUrl: "./test-list.component.html",
  styleUrls: ["./test-list.component.scss"],
})
export class TestListComponent implements OnInit {
  @ViewChild("shareModal") shareModal: TemplateRef<any>;

  public tests$: Observable<ShortTestModel[]>;
  public searchTerm$ = new Subject<string>();
  public shareForm: FormGroup;
  public selectedUsers: any[] = [];

  // Mock user data
  public users = [
    { id: 1, fullName: "John Doe" },
    { id: 2, fullName: "Jane Smith" },
    { id: 3, fullName: "Alice Johnson" },
    { id: 4, fullName: "Bob Williams" },
    { id: 5, fullName: "Emma Davis" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public testService: TestService
  ) {}

  ngOnInit() {
    this.tests$ = this.searchTerm$.pipe(
      startWith(""),
      debounceTime(1000),
      switchMap((searchTerm) => this.testService.getTests$(searchTerm, 1, 1000))
    );

    this.initializeShareForm();
  }

  private initializeShareForm() {
    this.shareForm = this.formBuilder.group({
      shareUrl: "",
      usersList: this.formBuilder.array([]),
    });
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  copyUrl() {
    const urlInput = document.createElement("textarea");
    urlInput.value = this.shareForm.get("shareUrl").value;
    document.body.appendChild(urlInput);
    urlInput.select();
    document.execCommand("copy");
    document.body.removeChild(urlInput);
  }

  /**
   * Open the share modal
   */
  openShareModal(shortTestModel: ShortTestModel) {
    const shareUrl = `${window.location.origin}/test/examination/${shortTestModel.id}?AccessCode=${shortTestModel.accessCode.code}`;
    this.shareForm.patchValue({ shareUrl });
    this.modalService.open(this.shareModal, { centered: true });
  }


  // Search user
  formatUser = (user: any) => {
    return user && user.fullName ? user.fullName : "";
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term
          ? this.users.filter((user) =>
              user.fullName.toLowerCase().includes(term.toLowerCase())
            )
          : this.users.slice()
      )
    );

    onUserSelected(event: any) {
      const user = event.item;
      if (!this.selectedUsers.find((u) => u.id === user.id)) {
        this.selectedUsers.push(user);
      }
    }
  
    removeUser(user: any) {
      const index = this.selectedUsers.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }

}
