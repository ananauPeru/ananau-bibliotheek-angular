import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemCategorie } from '../models/item-categorie.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-toevoegen',
  templateUrl: './item-toevoegen.component.html',
  styleUrls: ['./item-toevoegen.component.scss']
})
export class ItemToevoegenComponent implements OnInit {

  public itemToevoegenFormulier: FormGroup;
  public successMessage: string = null;
  public errorMessage: string = null; 
  public itemCategorieen = ItemCategorie
  public itemCategorieenSleutels = Object.keys(ItemCategorie)

  constructor(public router: Router, private fb: FormBuilder, private itemService: ItemService, public translate: TranslateService) {
  }

  ngOnInit() {
    this.itemToevoegenFormulier = this.fb.group({
      naam: ['', [Validators.required]],
      merk: [''],
      materiaal: [''],
      categorie: ["geenCategorie"],
      inhoud: [''],
      aankoopDatum: [new Date()]
    })
  }

  itemToevoegen() {
    this.itemService.addItem$(this.itemToevoegenFormulier.value.naam, this.itemToevoegenFormulier.value.merk, this.itemToevoegenFormulier.value.materiaal, this.itemToevoegenFormulier.value.categorie, this.itemToevoegenFormulier.value.inhoud, this.itemToevoegenFormulier.value.aankoopDatum).subscribe(
      val => {
        if (val) {
          this.translate.get('itemToevoegenGelukt').subscribe((text: string) => { 
            this.router.navigate([`../item/${val.id}`], { state: { successMessage: text } });
           });
          
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );

  }
}
