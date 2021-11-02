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
    _doel: any
  ) {
    
    let taal = undefined;
    if (_taal) {
      taal = _taal
    }
    let doel = undefined;
    if (_doel) {
      doel = _doel
    }
    let naam = undefined;
    if (_naam) {
      naam = _naam.toLowerCase()
    }


    if ( doel && taal && naam){
      this.classes = this._classes.pipe(
        map((lessen) =>
          lessen.filter((cl) => {
            let c = cl.language.includes(taal) && cl.public.includes(doel) && (
              cl.title.toLowerCase().includes(naam) ||
              cl.author.toLowerCase().includes(naam) ||
              cl.description.toLowerCase().includes(naam)
            )
            return c;
          })
        )
      );
    }
    else{
      if (doel && taal){
        this.classes = this._classes.pipe(
          map((lessen) =>
            lessen.filter((cl) => {
              let c = cl.language.includes(taal) && cl.public.includes(doel)
              return c;
            })
          )
        );
      }
      else{
        if(taal && naam){
          this.classes = this._classes.pipe(
            map((lessen) =>
              lessen.filter((cl) => {
                let c = cl.language.includes(taal)  && (
                  cl.title.toLowerCase().includes(naam) ||
                  cl.author.toLowerCase().includes(naam) ||
                  cl.description.toLowerCase().includes(naam)
                )
                return c;
              })
            )
          );
        }
        else{
          if(doel && naam){
            this.classes = this._classes.pipe(
              map((lessen) =>
                lessen.filter((cl) => {
                  let c = cl.public.includes(doel) && (
                    cl.title.toLowerCase().includes(naam) ||
                    cl.author.toLowerCase().includes(naam) ||
                    cl.description.toLowerCase().includes(naam)
                  )
                  return c;
                })
              )
            );
          }
          else{
            if(taal){
              this.classes = this._classes.pipe(
                map((lessen) =>
                  lessen.filter((cl) => {
                    let c = cl.language.includes(taal)
                    return c;
                  })
                )
              );
            }
            else{
              if(doel){
                this.classes = this._classes.pipe(
                  map((lessen) =>
                    lessen.filter((cl) => {
                      let c = cl.public.includes(doel) 
                      return c;
                    })
                  )
                );
              }
              else{
                if(naam){
                  this.classes = this._classes.pipe(
                    map((lessen) =>
                      lessen.filter((cl) => {
                        let c =  (
                          cl.title.toLowerCase().includes(naam) ||
                          cl.author.toLowerCase().includes(naam) ||
                          cl.description.toLowerCase().includes(naam)
                        )
                        return c;
                      })
                    )
                  );
                }
                else{
                  this.classes = this._classes.pipe(
                    map((lessen) =>  lessen )) 
                }
              }
            }
          }
          
        }
      }
    }

  
   
   
  
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
