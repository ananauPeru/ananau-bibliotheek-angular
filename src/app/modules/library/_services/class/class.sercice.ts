import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ClassModel } from "../../_models/class.model";
import { ClassHTTPService } from "./class-http/class-http.service";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  private filterString = "";

  private _classes: BehaviorSubject<ClassModel[]> = new BehaviorSubject([]);
  public classes: Observable<ClassModel[]> = this._classes.asObservable();



  constructor(
    private classHttpService: ClassHTTPService,
    private router: Router
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.classHttpService.getAllClasses$().subscribe(
      (res) => {
        
        this._classes.next(res);
      },
      (err) => console.error("Error retrieving classes")
    );
  }

  filter(
    filter: any,
    _category: any,
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
    return this._classes;
   /* if (category == undefined) {
      this.classes = this._classes.pipe(
        map((books) =>
          books.filter((book) => {
            let b =
              book.Title.toLowerCase().includes(f) ||
              (book.Description
                ? book.Description.toLowerCase().includes(f)
                : false) ||
              (book.Author ? book.Author.toLowerCase().includes(f) : false) ||
              (book.Public ? book.Public.toLowerCase().includes(f) : false) ||
              (book.Language ? book.Language.toLowerCase().includes(f) : false);
            return b;
          })
        )
      );
    }

    if (genre) {
      this.classes = this._classes.pipe(
        map((books) =>
          books.filter((book) => {
            let b = book.Language.toUpperCase().includes(genre);
            return b;
          })
        )
      );
    }*/
  }

}
