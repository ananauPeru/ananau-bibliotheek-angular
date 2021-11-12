import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { OverviewClassComponent } from '../../overview/class/overview-class.component';
import { ClassLanguages } from '../../_models/class-languages.enum';
import { ClassPubliek } from '../../_models/class-publiek.enum';
import { ClassSubject } from '../../_models/class-subject.enum';
import { ClassModel } from '../../_models/class.model';
import { ClassService } from '../../_services/class/class.sercice';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ClassHTTPService } from '../../_services/class/class-http/class-http.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class FinderClassComponent implements OnInit {
  public classTalen = ClassLanguages
  public classPubliek = ClassPubliek
  public classVakken = ClassSubject
  public filteredListEmpty: Observable<Boolean>
  closeResult = '';
  class :  Observable<ClassModel>
  
  constructor(public classService: ClassService, public classHttpService : ClassHTTPService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
 
  //INFORMATICA-KLEUTER-ENGELS
  IKE(): Observable<ClassModel[]> {
    this.classService.filter("","ENGELS", "kleuterschool", "IN")

    let classList = this.classService.classes.pipe( map((c) => c ),)
    this.filteredListEmpty = classList.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true),
    )
    
    return classList
  }

  //INFORMATICA-KLEUTER-NEDERLANDS
  IKN(): Observable<ClassModel[]> {
    this.classService.filter("","NEDERLANDS", "kleuterschool", "IN")

    let classList = this.classService.classes.pipe( map((c) => c ),)
    this.filteredListEmpty = classList.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true),
    )
    
    return classList
  }

   //INFORMATICA-KLEUTER-SPAANS
   IKS(): Observable<ClassModel[]> {
    this.classService.filter("","SPAANS", "kleuterschool", "IN")

    let classList = this.classService.classes.pipe( map((c) => c ),)
    this.filteredListEmpty = classList.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true),
    )
    
    return classList
  }
//INFORMATICA-LAGERESCHOOL-ENGELS
ILE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "lagerschool", "IN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//INFORMATICA-LAGERESCHOOL-NEDERLANDS
ILN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "lagerschool", "IN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //INFORMATICA-LAGERESCHOOL-SPAANS
 ILS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "lagerschool", "IN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//INFORMATICA-LAGERESCHOOL-ENGELS
IME(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "middelbaar", "IN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//INFORMATICA-LAGERESCHOOL-NEDERLANDS
IMN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "middelbaar", "IN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //INFORMATICA-LAGERESCHOOL-SPAANS
 IMS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "middelbaar", "IN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}


 //WISKUNDE-KLEUTER-ENGELS
 WKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "WI")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//WISKUNDE-KLEUTER-NEDERLANDS
WKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "WI")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //WISKUNDE-KLEUTER-SPAANS
 WKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "WI")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//WISKUNDE-LAGERESCHOOL-ENGELS
WLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "WI")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//WISKUNDE-LAGERESCHOOL-NEDERLANDS
WLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "WI")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//WISKUNDE-LAGERESCHOOL-SPAANS
WLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "WI")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//WISKUNDE-MIDDELBAAR-ENGELS
WME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "WI")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//WISKUNDE-MIDDELBAAR-NEDERLANDS
WMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "WI")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//WISKUNDE-MIDDELBAAR-SPAANS
WMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "WI")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

 //ENGELS-KLEUTER-ENGELS
 EKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "EN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//ENGELS-KLEUTER-NEDERLANDS
EKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "EN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //ENGELS-KLEUTER-SPAANS
 EKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "EN")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//ENGELS-LAGERESCHOOL-ENGELS
ELE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "EN")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ENGELS-LAGERESCHOOL-NEDERLANDS
ELN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "EN")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ENGELS-LAGERESCHOOL-SPAANS
ELS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "EN")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//ENGELS-MIDDELBAAR-ENGELS
EME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "EN")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ENGELS-MIDDELBAAR-NEDERLANDS
EMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "EN")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ENGELS-MIDDELBAAR-SPAANS
EMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "EN")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
  
}
