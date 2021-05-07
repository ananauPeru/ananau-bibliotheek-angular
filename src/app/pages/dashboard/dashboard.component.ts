import { Component, OnInit } from "@angular/core";
import { AuthUtil } from "src/app/_utils/auth_util";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(public AuthUtil: AuthUtil) {}

  ngOnInit(): void {}
}
