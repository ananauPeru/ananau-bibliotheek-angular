import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistreerComponent } from './registreer/registreer.component';
import { WachtwoordvergetenComponent } from './wachtwoordvergeten/wachtwoordvergeten.component';
import { OverviewComponent } from './overview/overview.component';
import { httpInterceptorProviders } from './http-inceptors';
import { UitgeleendeBoekenTabelComponent } from './uitgeleende-boeken-tabel/uitgeleende-boeken-tabel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { GebruikerItemsTabelComponent } from './gebruiker-items-tabel/gebruiker-items-tabel.component';
import { ScanItemComponent } from './scan-item/scan-item.component';
import { QRCodeModule } from 'angular2-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ItemInfoComponent } from './item-info/item-info.component';
import { AccountWijzigenComponent } from './account-wijzigen/account-wijzigen.component';
import { ItemsBeherenComponent } from './items-beheren/items-beheren.component';
import { ItemToevoegenComponent } from './item-toevoegen/item-toevoegen.component';
import { ItemWijzigenComponent } from './item-wijzigen/item-wijzigen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    RegistreerComponent,
    WachtwoordvergetenComponent,
    OverviewComponent,
    UitgeleendeBoekenTabelComponent,
    PageNotFoundComponent,
    SidemenuComponent,
    ItemPageComponent,
    GebruikerItemsTabelComponent,
    ScanItemComponent,
    ItemInfoComponent,
    AccountWijzigenComponent,
    ItemsBeherenComponent,
    ItemToevoegenComponent,
    ItemWijzigenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    ZXingScannerModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
