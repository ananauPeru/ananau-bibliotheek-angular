import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-overview-test",
  templateUrl: "./overview-test.component.html",
  styleUrls: ["./overview-test.component.scss"],
})
export class OverviewTestComponent implements OnInit {

  public testId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    // Get the test ID from the route
    this.route.params.subscribe((params) => (this.testId = params["id"]));

  }
}
