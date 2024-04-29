import { Component, OnInit } from "@angular/core";
import { AuthUtil } from "src/app/_utils/auth_util";
import { DomainUtil, Subdomain } from "src/app/_utils/domain_util";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(public AuthUtil: AuthUtil, public DomainUtil: DomainUtil) {}

  ngOnInit(): void {
  }
}