import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
