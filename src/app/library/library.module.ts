import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from "@angular/router";
import { QRCodeModule } from 'angular2-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { OverviewComponent } from './overview/overview.component';
import { UitgeleendeBoekenTabelComponent } from './uitgeleende-boeken-tabel/uitgeleende-boeken-tabel.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { GebruikerItemsTabelComponent } from './gebruiker-items-tabel/gebruiker-items-tabel.component';
import { ScanItemComponent } from './scan-item/scan-item.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemsBeherenComponent } from './items-beheren/items-beheren.component';
import { ItemToevoegenComponent } from './item-toevoegen/item-toevoegen.component';
import { ItemWijzigenComponent } from './item-wijzigen/item-wijzigen.component';
import { ItemResolver } from './item.resolver';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'item/:id',
    component: ItemPageComponent,
    resolve: { item: ItemResolver }
  },
  {
    path: 'scan',
    component: ScanItemComponent
  },
  {
    path: 'management',
    component: ItemsBeherenComponent
  },
  {
    path: 'add',
    component: ItemToevoegenComponent
  },
  {
    path: 'item/:id/edit',
    component: ItemWijzigenComponent,
    resolve: { item: ItemResolver }
  }
]

@NgModule({
  declarations: [
    OverviewComponent,
    UitgeleendeBoekenTabelComponent,
    ItemPageComponent,
    GebruikerItemsTabelComponent,
    ScanItemComponent,
    ItemInfoComponent,
    ItemsBeherenComponent,
    ItemToevoegenComponent,
    ItemWijzigenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QRCodeModule,
    ZXingScannerModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    OverviewComponent,
    ItemPageComponent,
    ScanItemComponent,
    ItemsBeherenComponent,
    ItemToevoegenComponent,
    ItemWijzigenComponent
  ]
})
export class LibraryModule { }
