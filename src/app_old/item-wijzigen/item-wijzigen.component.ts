import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ItemService } from "../services/item.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Item } from "../models/item.model";
import { ItemCategorie } from "../models/item-categorie.enum";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-item-wijzigen",
  templateUrl: "./item-wijzigen.component.html",
  styleUrls: ["./item-wijzigen.component.scss"],
})
export class ItemWijzigenComponent implements OnInit {
  public item: Item;
  public itemWijzigenFormulier: FormGroup;
  public errorMessage: string;
  public itemCategorieen = ItemCategorie;
  public itemCategorieenSleutels = Object.keys(ItemCategorie);

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private itemService: ItemService,
    public translate: TranslateService
  ) {
    this.route.data.subscribe((data) => {
      this.item = data["item"];
    });
  }

  ngOnInit() {
    this.itemWijzigenFormulier = this.fb.group({
      naam: [this.item.naam, [Validators.required]],
      merk: [this.item.merk],
      materiaal: [this.item.materiaal],
      categorie: [this.item.categorie],
      inhoud: [this.item.inhoud],
      aankoopDatum: [
        this.item.aankoopDatum
          ? this.item.aankoopDatum.toISOString().substring(0, 10)
          : "",
      ],
    });
  }

  itemWijzigen() {
    this.item.naam = this.itemWijzigenFormulier.value.naam;
    this.item.merk = this.itemWijzigenFormulier.value.merk;
    this.item.materiaal = this.itemWijzigenFormulier.value.materiaal;
    this.item.inhoud = this.itemWijzigenFormulier.value.inhoud;
    this.item.aankoopDatum = this.itemWijzigenFormulier.value.aankoopDatum;
    this.item.categorie = this.itemWijzigenFormulier.value.categorie;

    console.log(this.item);
    
    this.itemService.putItem$(this.item).subscribe(
      (val) => {
        if (val) {
          this.translate.get("itemGewijzigd").subscribe((text: string) => {
            this.router.navigate([`../item/${val.id}`], {
              state: { successMessage: text },
            });
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = this.translate.instant(`${error.error}`);
      }
    );
  }
}
