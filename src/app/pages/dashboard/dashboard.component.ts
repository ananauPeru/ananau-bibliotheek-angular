import { Component, OnInit } from "@angular/core";
import { AuthUtil } from "src/app/_utils/auth_util";
import { DomainUtil, Subdomain } from "src/app/_utils/domain_util";
import { AuthService } from "src/app/modules/auth";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(public AuthUtil: AuthUtil, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logoutIfTokenExpired();
  }
}