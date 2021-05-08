import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ItemHTTPService } from "src/app/modules/library/_services/item/item-http/item-http.service";
import { RoleModel } from "../../_models/role.model";
import { RoleHTTPService } from "./role-http/role-http.service";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private filterString = "";

  private _roles: BehaviorSubject<RoleModel[]> = new BehaviorSubject([]);
  public roles: Observable<RoleModel[]> = this._roles
    // .pipe(
    //   map((items) => items.filter((item) => item.name == this.filterString)),
    // )
    .asObservable();

  // get items() {
  //   return asObservable(this.items)
  // }

  constructor(
    private roleHttpService: RoleHTTPService,
    private router: Router
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.roleHttpService.getAllRoles$().subscribe(
      (res) => {
        this._roles.next(res);
      },
      (err) => console.error("Error retrieving Items")
    );
  }
}
