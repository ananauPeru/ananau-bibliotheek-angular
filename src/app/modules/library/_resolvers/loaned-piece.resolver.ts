import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BookModel } from '../_models/book.model';
import { LoanedPieceModel } from '../_models/loaned-piece.model';
import { LoanHTTPService } from '../_services/loan/loan-http/loan-http.service';

@Injectable({
    providedIn: "root"
})
export class LoanedPieceResolver implements Resolve<LoanedPieceModel> {
    constructor(private loanService: LoanHTTPService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<LoanedPieceModel> {
        return this.loanService.getItemById(route.params["id"]);
    }
}
