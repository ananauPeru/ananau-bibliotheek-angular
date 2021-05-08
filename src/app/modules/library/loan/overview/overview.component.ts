import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { defaultIfEmpty, map } from "rxjs/operators";
import { LoanedPieceModel } from "../../_models/loaned-piece.model";
import { LoanService } from "../../_services/loan/loan.service";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  public working = true;
  public filter = "";
  public filteredActiveLoansEmpty: Observable<Boolean>;

  constructor(public loanService: LoanService) {}

  ngOnInit(): void {}

  applyFilter(filterValue: string) {}

  filteredActiveLoans(): Observable<LoanedPieceModel[]> {
    this.loanService.filter("open", this.filter);
    this.filteredActiveLoansEmpty = this.loanService.loans.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true)
    );
    return this.loanService.loans;
  }

  filteredArchivedLoans(): Observable<LoanedPieceModel[]> {
    this.loanService.filter("closed");
    return this.loanService.loans;
  }

  diffDays(date) {
    let d = new Date(date);
    let od = new Date();
    return Math.floor(
      (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) -
        Date.UTC(od.getFullYear(), od.getMonth(), od.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }

  listEmpty(l: any): boolean {
    let b = l.pipe(
      map((count) => count > 0),
      defaultIfEmpty(true)
    );
    return b;
  }
}
