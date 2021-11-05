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
    _naam: any,
    _taal: any,
    _doel: any,
    _vak: any
  ) {
    
    let taal = "";
    if (_taal) {
      taal = _taal
    }
    let vak = "";
    if (_vak) {
      vak = _vak
    }
    let doel = "";
    if (_doel) {
      doel = _doel
    }
    let naam = "";
    if (_naam) {
      naam = _naam.toLowerCase()
    }
    console.log(vak)

  
      this.classes = this._classes.pipe(
        map((lessen) =>
          lessen.filter((cl) => {
            let c = cl.language.includes(taal) && cl.public.includes(doel) && cl.subjects.includes(vak) && (
              cl.title.toLowerCase().includes(naam) ||
              cl.author.toLowerCase().includes(naam) ||
              cl.description.toLowerCase().includes(naam)
            )
            return c;
          })
        )
      );
  
  }

}
