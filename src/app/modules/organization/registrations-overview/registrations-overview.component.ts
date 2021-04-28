import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registrations-overview",
  templateUrl: "./registrations-overview.component.html",
  styleUrls: ["./registrations-overview.component.scss"],
})
export class RegistrationsOverviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  applyFilter(filterValue: string) {
    console.log(filterValue);
  }
}
