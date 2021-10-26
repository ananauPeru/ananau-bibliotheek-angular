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
     pp: number,
     p: number,
    _genre: any
  ) {
    let f = undefined;
    if (filter){
      f = filter.toLowerCase();
    }
    
    let category = undefined;
    if (_category) {
      category = _category.toLowerCase();
    }
    let genre = undefined;
    if (_genre) {
      genre = _genre.toLowerCase();
    }
    if (category == undefined) {
      this.classes = this._classes.pipe(
        map((classes) =>
          classes.filter((c) => {
            let b = c.Title.includes(f) ||
              (c.Description? c.Description.toLowerCase().includes(f) : false) ||
              (c.Autor ? c.Autor.toLowerCase().includes(f) : false);
            return b;
          })
        )
      );
    }

    if (genre ) {
      this.classes = this._classes.pipe(
        map((c) =>
          c.filter((cl) => {
            let b = cl.Public.toLowerCase().includes(genre);
            return b;
          })
        )
      );
    }
  }
}
