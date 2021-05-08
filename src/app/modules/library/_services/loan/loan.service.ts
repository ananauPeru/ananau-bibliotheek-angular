import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoanedPieceDTO } from "../../_dto/loaned-piece-dto";
import { LoanedPieceModel } from "../../_models/loaned-piece.model";
import { LoanHTTPService } from "./loan-http/loan-http.service";

@Injectable({
  providedIn: "root",
})
export class LoanService {
  private filterString = "";

  private _loans: BehaviorSubject<LoanedPieceModel[]> = new BehaviorSubject([]);
  public loans: Observable<LoanedPieceModel[]> = this._loans.asObservable();

  constructor(
    private loanHttpService: LoanHTTPService,
    private router: Router
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loanHttpService.getAllloans$().subscribe(
      (res) => {
        this._loans.next(res);
      },
      (err) => console.error("Error retrieving loans")
    );
  }

  filter(s: string, f?: string) {
    let status = s.toLowerCase();
    let filter = f ? f.toLowerCase() : "";
    this.loans = this._loans.pipe(
      map((loans) =>
        loans.filter((l) => {
          let b =
            l.status.toLowerCase().includes(status) &&
            ((
              l.loaningUser.userDetail.firstName +
              " " +
              l.loaningUser.userDetail.lastName
            )
              .toLowerCase()
              .includes(filter) ||
              l.loaningUser.email.toLowerCase().includes(filter));
          return b;
        })
      )
    );
  }

  create(loanedPieceDTO: LoanedPieceDTO): Observable<LoanedPieceModel> {
    return this.loanHttpService.create(loanedPieceDTO);
  }

  edit(
    routeId: number,
    loanedPieceDTO: LoanedPieceDTO
  ): Observable<LoanedPieceModel> {
    return this.loanHttpService.edit(routeId, loanedPieceDTO);
  }
}
