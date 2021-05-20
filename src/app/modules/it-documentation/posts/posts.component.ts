import { Component, OnInit } from '@angular/core'
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import Quill from 'quill'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public inner: string

  constructor() {
    this.inner = 'hi there'
  }

  ngOnInit(): void {}

  created(event: Quill) {
    // tslint:disable-next-line:no-console
    // console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event)
    console.log(this.inner)
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    // console.log('focus', $event)
    // this.focused = true
    // this.blurred = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    // console.log('blur', $event)
    // this.focused = false
    // this.blurred = true
  }
}
