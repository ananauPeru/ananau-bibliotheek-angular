import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BookModel } from "../../_models/book.model";
import { BookHTTPService } from "./book-http/book-http.service";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private filterString = "";

  private _books: BehaviorSubject<BookModel[]> = new BehaviorSubject([]);
  public books: Observable<BookModel[]> = this._books
    // .pipe(
    //   map((books) => books.filter((book) => book.name == this.filterString)),
    // )
    .asObservable();

  // get books() {
  //   return asObservable(this.books)
  // }

  constructor(
    private bookHttpService: BookHTTPService,
    private router: Router
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.bookHttpService.getAllBooks$().subscribe(
      (res) => {
        // let books = (<Object[]>res.json()).map((todo: any) =>
        //     new book({id:todo.id, description:todo.description,completed: todo.completed}));

        this._books.next(res);
      },
      (err) => console.error("Error retrieving books")
    );
  }

  filter(
    filter: any,
    _category: any,
    // pp: number,
    // p: number,
    _genre: any
  ) {
    let f = filter.toLowerCase();
    let category = undefined;
    if (_category) {
      category = _category.toLowerCase();
    }
    let genre = undefined;
    if (_genre) {
      genre = _genre.toLowerCase();
    }
    if (category == undefined) {
      this.books = this._books.pipe(
        map((books) =>
          books.filter((book) => {
            let b =
              book.name.toLowerCase().includes(f) ||
              (book.description
                ? book.description.toLowerCase().includes(f)
                : false) ||
              (book.author ? book.author.toLowerCase().includes(f) : false) ||
              (book.state ? book.state.toLowerCase().includes(f) : false) ||
              (book.genre ? book.genre.toLowerCase().includes(f) : false);
            return b;
          })
        )
      );
    }

    if (genre) {
      this.books = this._books.pipe(
        map((books) =>
          books.filter((book) => {
            let b = book.genre.toLowerCase().includes(genre);
            return b;
          })
        )
      );
    }
  }
}
