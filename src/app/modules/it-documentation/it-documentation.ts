import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-it-documentation',
  templateUrl: './it-documentation.component.html',
  styleUrls: ['./it-documentation.component.scss'],
})
export class ITDocumentationComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
