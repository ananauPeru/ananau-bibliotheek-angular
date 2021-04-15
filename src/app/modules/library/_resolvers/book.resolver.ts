import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BookModel } from '../_models/book.model';
import { BookHTTPService } from '../_services/book/book-http/book-http.service';

@Injectable({
    providedIn: "root"
})
export class BookResolver implements Resolve<BookModel> {
    constructor(private bookService: BookHTTPService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<BookModel> {
        return this.bookService.getItemById(route.params["id"]);
    }
}
