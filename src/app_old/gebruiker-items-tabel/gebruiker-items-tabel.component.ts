import { Component, OnInit, Input } from '@angular/core';
import { GebruikerItem } from '../models/gebruiker-item.model';

@Component({
  selector: 'app-gebruiker-items-tabel',
  templateUrl: './gebruiker-items-tabel.component.html',
  styleUrls: ['./gebruiker-items-tabel.component.scss']
})
export class GebruikerItemsTabelComponent implements OnInit {
  @Input() public items: GebruikerItem[];
  @Input() public startNummer: number;
  constructor() {
  }

  ngOnInit() {
  }

}
