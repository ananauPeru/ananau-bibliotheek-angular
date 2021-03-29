import { Component, OnInit, Input } from '@angular/core';
import { GebruikerItem } from '../models/gebruiker-item.model';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uitgeleende-boeken-tabel',
  templateUrl: './uitgeleende-boeken-tabel.component.html',
  styleUrls: ['./uitgeleende-boeken-tabel.component.scss']
})
export class UitgeleendeBoekenTabelComponent implements OnInit {

  @Input() public items: GebruikerItem[];
  @Input() public startNummer: Boolean;

  constructor(private router: Router) { }

  ngOnInit() { }
  
  redirectTo(item: any) {
    this.router.navigate([`../item/${item.item.id}`]);
  }

}
