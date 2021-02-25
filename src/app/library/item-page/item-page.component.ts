import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../models/item.model';
import { _ } from 'underscore';
import { GebruikerItem } from '../models/gebruiker-item.model';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  public item: Item;
  public vanafGebruikerItems: number = 0;
  public loading: Boolean;
  public successMessage: string = null;
  public errorMessage: string = null;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.item = data['item'];
      if (this.router.getCurrentNavigation().extras.state != undefined) {
        this.successMessage = this.router.getCurrentNavigation().extras.state.successMessage;
      }
    });
  }

  getGebruikerItems() {
    var uitvoer = _.sortBy([...this.item.gebruikerItems], 'ontleendOp').reverse();
    return uitvoer.splice(this.vanafGebruikerItems, this.vanafGebruikerItems + 10);
  }

  veranderGebruikerItemsScope(naar: number) {
    this.vanafGebruikerItems += (naar * 10);
  }

  ngOnInit() {
  }

}
