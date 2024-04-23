import { Component, OnInit } from "@angular/core";
import { TestService } from "../_services/test.service";

@Component({
  selector: "app-test-list",
  templateUrl: "./test-list.component.html",
  styleUrls: ["./test-list.component.scss"],
})
export class TestListComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit() {
    console.log("TestListComponent");
    this.testService.getTests$("", 1, 10).subscribe((tests) => {
      console.log(tests);
    });
  }
}
