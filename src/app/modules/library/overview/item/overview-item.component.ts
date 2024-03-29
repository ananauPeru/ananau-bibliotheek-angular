import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ItemService } from "../../_services/item/item.service";
import { AuthUtil } from "../../../../_utils/auth_util";
import { BookCategories } from "../../_models/book-categories.enum";
import { Categories } from "../../_models/categories.enum";
import { Observable, timer } from "rxjs";
import { EducationalCourses } from "../../_models/educational-courses.enum";
import { defaultIfEmpty, map } from "rxjs/operators";
import { ItemModel } from "../../_models/item.model";
import { CsvUtil } from 'src/app/_utils/csv_util'

@Component({
  selector: "app-overview",
  templateUrl: "./overview-item.component.html",
  styleUrls: ["./overview-item.component.scss"],
})
export class OverviewItemComponent implements OnInit {
  private itemsPerPage: number = 5;
  public page: number = 0;
  public Categories = Categories;
  public EducationalCourses = EducationalCourses;
  public showErrorGenre: boolean = false;
  public filteredListEmpty: Observable<Boolean>;

  // MatPaginator Output
  pageEvent: PageEvent;

  dataSource7: MatTableDataSource<[]>;
  displayedColumns7: string[] = ["id", "name", "description", "color"];

  category: string = undefined;
  genre: string = undefined;

  @ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
  @ViewChild("sort7", { static: true }) sort7: MatSort;

  formGroup: FormGroup;

  ngAfterViewInit() {}

  constructor(
    private http: HttpClient,
    public itemService: ItemService,
    public AuthUtil: AuthUtil,
    private csvUtil: CsvUtil,
  ) {
    this.dataSource7 = new MatTableDataSource();
  }

  ngOnInit(): void {
    // Example 7
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;

    this.applyFilter7("");
  }

  async exportItems() {
    let items: any = await this.itemService.getAllBooksForExport();

    const normalizedItems = items.map(item => ({
      name: item.name || "not found",
      description: item.description || "not found",
      brand: item.brand || "not found",
      category: item.category || "not found",
      course: item.course || "not found",
      quantity: item.quantity || "not found",
      archived: item.archived,
    }));

    this.csvUtil.csvDownload(normalizedItems, "AllItemsInLibrary");
  }

  applyFilter7(filterValue: string) {
    this.dataSource7.filter = filterValue.trim().toLowerCase();
    this.paginate();
  }

  applyCategory(category: string) {
    this.showErrorGenre = false;

    if (category.length > 0) {
      this.category = category;
    } else {
      this.category = undefined;
    }

    this.paginate();
  }

  applyGenre(genre: string) {
    this.showErrorGenre = false;

    if (genre.length > 0) {
      this.genre = genre;
    } else {
      this.genre = undefined;
    }

    this.paginate();
  }

  pageEvents(event: any) {
    this.itemsPerPage = event.pageSize;
    this.setPage(event.pageIndex);
  }

  setPage(p: number) {
    this.page = p;
    this.paginate();
  }

  paginate(): Observable<ItemModel[]> {
    this.itemService.filter(this.dataSource7.filter, this.category, this.genre);

    let bookList = this.itemService.items.pipe(
      map((items) =>
        items.filter((item, index) => {
          let i =
            index >= this.itemsPerPage * this.page &&
            index <= this.itemsPerPage * (this.page + 1);
          return i;
        })
      )
    );

    this.filteredListEmpty = bookList.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true)
    );

    return bookList;
  }

  showError() {
    // set showloader to true to show loading div on view
    this.showErrorGenre = true;

    let _timer = timer(3000); // 5000 millisecond means 5 seconds
    let subscription = _timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.showErrorGenre = false;
    });
  }
}
