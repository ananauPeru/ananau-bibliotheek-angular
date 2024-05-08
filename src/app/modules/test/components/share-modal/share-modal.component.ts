// share-modal.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
})
export class ShareModalComponent implements OnInit{
  @Input() shareUrl: string;
  @Input() users: any[];
  @Output() share = new EventEmitter<any[]>();

  shareForm: FormGroup;
  selectedUsers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.shareForm = this.formBuilder.group({
      shareUrl: this.shareUrl,
      usersList: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.shareForm.get("shareUrl").setValue(this.shareUrl);
  }

  copyUrl() {
    const urlInput = document.createElement('textarea');
    urlInput.value = this.shareForm.get('shareUrl').value;
    document.body.appendChild(urlInput);
    urlInput.select();
    document.execCommand('copy');
    document.body.removeChild(urlInput);
  }

  formatUser = (user: any) => {
    return user && user.fullName ? user.fullName : '';
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

  onShare() {
    this.share.emit(this.selectedUsers);
    this.activeModal.close();
  }
}