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

//FRANS-KLEUTER-ENGELS
FKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "FR")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//FRANS-KLEUTER-NEDERLANDS
FKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "FR")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //FRANS-KLEUTER-SPAANS
 FKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "FR")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//FRANS-LAGERESCHOOL-ENGELS
FLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "FR")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//FRANS-LAGERESCHOOL-NEDERLANDS
FLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "FR")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//FRANS-LAGERESCHOOL-SPAANS
FLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "FR")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//FRANS-MIDDELBAAR-ENGELS
FME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "FR")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//FRANS-MIDDELBAAR-NEDERLANDS
FMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "FR")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//FRANS-MIDDELBAAR-SPAANS
FMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "FR")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//GESCHIEDENIS-KLEUTER-ENGELS
GKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "GE")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//GESCHIEDENIS-KLEUTER-NEDERLANDS
GKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "GE")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //GESCHIEDENIS-KLEUTER-SPAANS
 GKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "GE")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//GESCHIEDENIS-LAGERESCHOOL-ENGELS
GLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "GE")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//GESCHIEDENIS-LAGERESCHOOL-NEDERLANDS
GLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "GE")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//GESCHIEDENIS-LAGERESCHOOL-SPAANS
GLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "GE")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//GESCHIEDENIS-MIDDELBAAR-ENGELS
GME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "GE")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//GESCHIEDENIS-MIDDELBAAR-NEDERLANDS
GMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "GE")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//GESCHIEDENIS-MIDDELBAAR-SPAANS
GMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "GE")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
  
//OTHER-KLEUTER-ENGELS
OKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "OT")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//OTHER-KLEUTER-NEDERLANDS
OKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "OT")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //OTHER-KLEUTER-SPAANS
 OKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "OT")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//OTHER-LAGERESCHOOL-ENGELS
OLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "OT")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OTHER-LAGERESCHOOL-NEDERLANDS
OLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "OT")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OTHER-LAGERESCHOOL-SPAANS
OLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "OT")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//OTHER-MIDDELBAAR-ENGELS
OME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "OT")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OTHER-MIDDELBAAR-NEDERLANDS
OMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "OT")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OTHER-MIDDELBAAR-SPAANS
OMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "OT")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

  
//AARDERIJKSKUNDE-KLEUTER-ENGELS
AKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "AA")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//AARDERIJKSKUNDE-KLEUTER-NEDERLANDS
AKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "AA")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //AARDERIJKSKUNDE-KLEUTER-SPAANS
 AKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "AA")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//AARDERIJKSKUNDE-LAGERESCHOOL-ENGELS
ALE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "AA")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//AARDERIJKSKUNDE-LAGERESCHOOL-NEDERLANDS
ALN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "AA")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//AARDERIJKSKUNDE-LAGERESCHOOL-SPAANS
ALS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "AA")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//AARDERIJKSKUNDE-MIDDELBAAR-ENGELS
AME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "AA")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//AARDERIJKSKUNDE-MIDDELBAAR-NEDERLANDS
AMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "AA")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//AARDERIJKSKUNDE-MIDDELBAAR-ENGELS
AMS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "middelbaar", "AA")
  
  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
  }


//OCCUPATIONAL-KLEUTER-ENGELS
BKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "OC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//OCCUPATIONAL-KLEUTER-NEDERLANDS
BKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "OC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //OCCUPATIONAL-KLEUTER-SPAANS
 BKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "OC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//OCCUPATIONAL-LAGERESCHOOL-ENGELS
BLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "OC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OCCUPATIONAL-LAGERESCHOOL-NEDERLANDS
BLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "OC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OCCUPATIONAL-LAGERESCHOOL-SPAANS
BLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "OC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//OCCUPATIONAL-MIDDELBAAR-ENGELS
BME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "OC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OCCUPATIONAL-MIDDELBAAR-NEDERLANDS
BMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "OC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//OCCUPATIONAL-MIDDELBAAR-SPAANS
BMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "OC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

 //SOCIALCARE-KLEUTER-ENGELS
 SKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "SC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//SOCIALCARE-KLEUTER-NEDERLANDS
SKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "SC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //SOCIALCARE-KLEUTER-SPAANS
 SKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "SC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//SOCIALCARE-LAGERESCHOOL-ENGELS
SLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "SC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//SOCIALCARE-LAGERESCHOOL-NEDERLANDS
SLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "SC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//SOCIALCARE-LAGERESCHOOL-SPAANS
SLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "SC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//SOCIALCARE-MIDDELBAAR-ENGELS
SME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "SC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//SOCIALCARE-MIDDELBAAR-NEDERLANDS
SMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "SC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//SOCIALCARE-MIDDELBAAR-SPAANS
SMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "SC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//PSYCHOLOGY-KLEUTER-ENGELS
PKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "PY")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//PSYCHOLOGY-KLEUTER-NEDERLANDS
PKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "PY")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //PSYCHOLOGY-KLEUTER-SPAANS
 PKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "PY")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//PSYCHOLOGY-LAGERESCHOOL-ENGELS
PLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "PY")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//PSYCHOLOGY-LAGERESCHOOL-NEDERLANDS
PLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "PY")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//PSYCHOLOGY-LAGERESCHOOL-SPAANS
PLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "PY")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//PSYCHOLOGY-MIDDELBAAR-ENGELS
PME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "PY")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//PSYCHOLOGY-MIDDELBAAR-NEDERLANDS
PMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "PY")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//PSYCHOLOGY-MIDDELBAAR-SPAANS
PMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "PY")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ARTS-KLEUTER-ENGELS
KKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "AC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//ARTS-KLEUTER-NEDERLANDS
KKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "AC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //ARTS-KLEUTER-SPAANS
 KKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "AC")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//ARTS-LAGERESCHOOL-ENGELS
KLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "AC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ARTS-LAGERESCHOOL-NEDERLANDS
KLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "AC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ARTS-LAGERESCHOOL-SPAANS
KLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "AC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//ARTS-MIDDELBAAR-ENGELS
KME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "AC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ARTS-MIDDELBAAR-NEDERLANDS
KMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "AC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//ARTS-MIDDELBAAR-SPAANS
KMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "AC")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
  
//NUTRITION-KLEUTER-ENGELS
NKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "NU")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//NUTRITION-KLEUTER-NEDERLANDS
NKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "NU")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //NUTRITION-KLEUTER-SPAANS
 NKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "NU")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//NUTRITION-LAGERESCHOOL-ENGELS
NLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "NU")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//NUTRITION-LAGERESCHOOL-NEDERLANDS
NLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "NU")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//NUTRITION-LAGERESCHOOL-SPAANS
NLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "NU")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//NUTRITION-MIDDELBAAR-ENGELS
NME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "NU")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//NUTRITION-MIDDELBAAR-NEDERLANDS
NMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "NU")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//NUTRITION-MIDDELBAAR-SPAANS
NMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "NU")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

  
//COMMUNICATION-KLEUTER-ENGELS
CKE(): Observable<ClassModel[]> {
  this.classService.filter("","ENGELS", "kleuterschool", "CD")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

//COMMUNICATION-KLEUTER-NEDERLANDS
CKN(): Observable<ClassModel[]> {
  this.classService.filter("","NEDERLANDS", "kleuterschool", "CD")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}

 //COMMUNICATION-KLEUTER-SPAANS
 CKS(): Observable<ClassModel[]> {
  this.classService.filter("","SPAANS", "kleuterschool", "CD")

  let classList = this.classService.classes.pipe( map((c) => c ),)
  this.filteredListEmpty = classList.pipe(
    map((l) => l.length <= 0),
    defaultIfEmpty(true),
  )
  
  return classList
}
//COMMUNICATION-LAGERESCHOOL-ENGELS
CLE(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "lagerschool", "CD")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//COMMUNICATION-LAGERESCHOOL-NEDERLANDS
CLN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "lagerschool", "CD")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//COMMUNICATION-LAGERESCHOOL-SPAANS
CLS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "lagerschool", "CD")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}
//COMMUNICATION-MIDDELBAAR-ENGELS
CME(): Observable<ClassModel[]> {
this.classService.filter("","ENGELS", "middelbaar", "CD")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//COMMUNICATION-MIDDELBAAR-NEDERLANDS
CMN(): Observable<ClassModel[]> {
this.classService.filter("","NEDERLANDS", "middelbaar", "CD")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

//COMMUNICATION-MIDDELBAAR-SPAANS
CMS(): Observable<ClassModel[]> {
this.classService.filter("","SPAANS", "middelbaar", "CD")

let classList = this.classService.classes.pipe( map((c) => c ),)
this.filteredListEmpty = classList.pipe(
  map((l) => l.length <= 0),
  defaultIfEmpty(true),
)

return classList
}

}
