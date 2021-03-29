import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemCategorie } from '../models/item-categorie.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-items-beheren',
  templateUrl: './items-beheren.component.html',
  styleUrls: ['./items-beheren.component.scss']
})
export class ItemsBeherenComponent implements OnInit {

  public items: Item[];
  public errorMessage: string = null;
  public successMessage: string = null;
  public naamSorteren: string = null;
  public toegevoegdOpSorteren: string = null;
  public beschikbaarSorteren: string = null;
  public filterFormulier: FormGroup;
  public itemFilter: string = "";
  public beschikbaarFilter: string = "";
  public loadingItems: Boolean = true;
  public itemsVanaf: number = 0;
  public aantalItems: number = 25;
  public totaalAantalItemsBeschikaar;
  public gearchiveerd: boolean = false;
  public itemCategorieen = ItemCategorie
  public itemCategorieenSleutels = Object.keys(ItemCategorie)
  public categorieFilter: number = -1;

  constructor(private itemService: ItemService, public router: Router, private fb: FormBuilder, public translate: TranslateService) { }

  ngOnInit() {
    this.filterFormulier = this.fb.group({
      itemNaam: [''],
      beschikbaar: ['beiden'],
      categorie: [this.categorieFilter]
    })
    this.getItemMetFilterEnSorten();
  }

  verwijderItem(item: Item) {
    this.errorMessage = null;
    this.successMessage = null;
    this.itemService.deleteItem$(item).subscribe(
      val => {
        if (val) {
          this.getItemMetFilterEnSorten();
          this.translate.get('itemXVerwijderd', { naam: item.naam }).subscribe((text: string) => {
            this.successMessage = text;
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = this.translate.instant(`${error.error}`);
      }
    );
  }

  archiveringAanpassen(item: Item) {
    this.errorMessage = null;
    this.successMessage = null;
    this.loadingItems = true;
    item.gearchiveerd = !item.gearchiveerd;
    this.itemService.putItem$(item).subscribe(
      val => {
        if (val) {
          this.getItemMetFilterEnSorten();
          if (item.gearchiveerd) {
            this.translate.get('itemXWerdGearchiveerd', { naam: item.naam }).subscribe((text: string) => {
              this.successMessage = text;
            });
          } else {
            this.translate.get('itemXTerugGezet', { naam: item.naam }).subscribe((text: string) => {
              this.successMessage = text;
            });
          }

        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = this.translate.instant(`${error.error}`);
        this.getItemMetFilterEnSorten();
      }
    );

  }

  clearForm() {
    this.itemFilter == null;
    this.beschikbaarFilter == null;
    this.filterFormulier.get('itemNaam').setValue("");
    this.filterFormulier.get('beschikbaar').setValue("beiden");
    this.filterFormulier.get('categorie').setValue(-1);
    this.gearchiveerd = false;
    this.filteren();
  }

  veranderItemsScope(naar: number) {
    this.itemsVanaf += (naar * this.aantalItems);
    this.getItemMetFilterEnSorten();
  }

  filteren() {
    this.loadingItems = true;
    this.itemFilter = this.filterFormulier.value.itemNaam;
    this.beschikbaarFilter = this.filterFormulier.value.beschikbaar;
    this.categorieFilter = Object.values(this.itemCategorieenSleutels).indexOf(this.filterFormulier.value.categorie);
    this.getItemMetFilterEnSorten();
  }

  aantalItemsVeranderen(value: number) {
    this.aantalItems = value;
    this.itemsVanaf = 0;
    this.getItemMetFilterEnSorten();
  }

  sorteren(atribuut: string) {
    this.loadingItems = true;
    if (atribuut == "naam") {
      this.beschikbaarSorteren = null;
      this.toegevoegdOpSorteren = null;
      if (this.naamSorteren == null) {
        this.naamSorteren = "asc";
      } else if (this.naamSorteren == "asc") {
        this.naamSorteren = "desc";
      } else {
        this.naamSorteren = null;
      }
    } else if (atribuut == "beschikbaar") {
      this.naamSorteren = null;
      this.toegevoegdOpSorteren = null;
      if (this.beschikbaarSorteren == null) {
        this.beschikbaarSorteren = "asc";
      } else if (this.beschikbaarSorteren == "asc") {
        this.beschikbaarSorteren = "desc";
      } else {
        this.beschikbaarSorteren = null;
      }
    } else if (atribuut == "toegevoegdOp") {
      this.naamSorteren = null;
      this.beschikbaarSorteren = null;
      if (this.toegevoegdOpSorteren == null) {
        this.toegevoegdOpSorteren = "asc";
      } else if (this.toegevoegdOpSorteren == "asc") {
        this.toegevoegdOpSorteren = "desc";
      } else {
        this.toegevoegdOpSorteren = null;
      }
    }
    this.getItemMetFilterEnSorten();
  }

  redirectTo(item: any) {
    this.router.navigate([`../item/${item.id}`]);
  }

  getItemMetFilterEnSorten() {
    this.itemService.getItemsWithFilter$(
      this.itemsVanaf,
      this.aantalItems,
      this.naamSorteren == "asc",
      this.naamSorteren == "desc",
      this.beschikbaarSorteren == "asc",
      this.beschikbaarSorteren == "desc",
      this.toegevoegdOpSorteren == "asc",
      this.toegevoegdOpSorteren == "desc",
      this.itemFilter,
      this.beschikbaarFilter,
      this.gearchiveerd,
      this.categorieFilter).subscribe(
        val => {
          if (val) {
            this.loadingItems = false;
            this.items = val["items"];
            this.totaalAantalItemsBeschikaar = val["totaal"];
          }
        },
        error => {
          this.errorMessage = this.translate.instant(`${error.error}`);
        }
      )
  }

}
