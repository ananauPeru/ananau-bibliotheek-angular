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

}
