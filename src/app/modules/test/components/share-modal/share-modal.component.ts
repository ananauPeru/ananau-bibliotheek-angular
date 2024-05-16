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
  @Output() share = new EventEmitter<any[]>();

  shareForm: FormGroup;

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

  onShare() {
    this.activeModal.close();
  }
}