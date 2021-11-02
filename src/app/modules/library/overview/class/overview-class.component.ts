import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, timer } from 'rxjs';
import { ClassLanguages } from '../../_models/class-languages.enum'
import { ClassService } from '../../_services/class/class.sercice';
import { AuthUtil } from '../../../../_utils/auth_util'
import { ClassModel } from '../../_models/class.model';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { ClassPubliek } from '../../_models/class-publiek.enum';
import { BlobNamePrefix } from 'src/app/modules/organization/_models/blob-name-prefix';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-overview-class',
  templateUrl: './overview-class.component.html',
  styleUrls: ['./overview-class.component.scss']
})
export class OverviewClassComponent implements OnInit {
  private itemsPerPage: number = 5 - 1
  public page: number = 0
  public ClassCategories = ClassLanguages
  public ClassPubliek = ClassPubliek
  public showErrorTaal: boolean = false
  public filteredListEmpty: Observable<Boolean>

    // MatPaginator Output
    pageEvent: PageEvent

    dataSource7: MatTableDataSource<[]>
    displayedColumns7: string[] = ['Titel', 'Auteur', 'Beschrijving', 'taal','doelgroep']
  
    taal: string = undefined
    publiek: string = undefined
 
  
    @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator
    @ViewChild('sort7', { static: true }) sort7: MatSort
  
    formGroup: FormGroup
  
    ngAfterViewInit() {}

  constructor(  
    private http: HttpClient,
    public classService: ClassService,
    public AuthUtil: AuthUtil,
  ) {
    this.dataSource7 = new MatTableDataSource()
  }

  ngOnInit(): void {
    // Example 7
    this.dataSource7.paginator = this.paginator7
    this.dataSource7.sort = this.sort7

    this.applyFilter7('')
  }

  applyFilter7(filterValue: string) {
    this.dataSource7.filter = filterValue.trim().toLowerCase()
    this.paginate()
  }



  applyTaal(taal: string) {
    this.showErrorTaal = false

    if (taal.length > 0) {
      this.taal = taal
    } else {
      this.taal = undefined
    }

    this.paginate()
  }
  applyPubliek(p: string) {
    this.showErrorTaal = false

    if (p.length > 0) {
      this.publiek = p
    } else {
      this.publiek = undefined
    }

    this.paginate()
  }

  pageEvents(event: any) {
    this.itemsPerPage = event.pageSize
    this.setPage(event.pageIndex)
  }

  setPage(p: number) {
    this.page = p
    this.paginate()
  }

  paginate(): Observable<ClassModel[]> {
    this.classService.filter(this.dataSource7.filter, this.taal, this.publiek)

    let classList = this.classService.classes.pipe(
      map((c) =>
        c.filter((cl, index) => {
          let i =
            index >= this.itemsPerPage * this.page &&
            index <= this.itemsPerPage * (this.page + 1)
          return i
        }),
      ),
    )

    this.filteredListEmpty = classList.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true),
    )

    return classList
  }

  showError() {
    // set showloader to true to show loading div on view
    this.showErrorTaal = true

    let _timer = timer(3000) // 5000 millisecond means 5 seconds
    let subscription = _timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.showErrorTaal = false
    })
  }

 
    
}
