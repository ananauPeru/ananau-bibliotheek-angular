import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../data-services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gebruiker } from '../models/gebruiker.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-wijzigen',
  templateUrl: './account-wijzigen.component.html',
  styleUrls: ['./account-wijzigen.component.scss']
})
export class AccountWijzigenComponent implements OnInit {

  public accountWijzigenFormulier: FormGroup;
  public errorMessage: string = null;
  public loading: Boolean;
  public gebruiker: Gebruiker;
  public successMessage: string = null;

  constructor(public router: Router, private fb: FormBuilder, private accountService: AccountService, public translate: TranslateService) {
    this.accountService.huidigeGebruiker.subscribe(value => {
      this.gebruiker = value;
    });
  }

  ngOnInit() {
    this.accountWijzigenFormulier = this.fb.group({
      voornaam: [this.gebruiker.voornaam, [Validators.required]],
      achternaam: [this.gebruiker.achternaam, [Validators.required]],
      telefoon: [this.gebruiker.telefoonNummer, [Validators.required]],
      email: [this.gebruiker.email, [Validators.required, Validators.email],
      this.serverSideValidateUsername(this.accountService.checkUserNameAvailability)],
      geboorteDatum: [this.gebruiker.geboorteDatum.toISOString().substring(0, 10), [Validators.required]]
    })
  }

  accountWijzigen() {
    this.successMessage = null;
    this.errorMessage = null;
    var email = this.gebruiker.email;
    this.accountService
      .updateGebruiker(
        this.gebruiker.id,
        this.accountWijzigenFormulier.value.voornaam,
        this.accountWijzigenFormulier.value.achternaam,
        this.accountWijzigenFormulier.value.telefoon,
        this.accountWijzigenFormulier.value.email,
        this.accountWijzigenFormulier.value.geboorteDatum
    )
      
    
      .subscribe(
        val => {
          this.loading = true;
          if (val) {
            this.translate.get('wijzigingenToegepast').subscribe((text: string) => { this.successMessage = text });
            if (this.accountWijzigenFormulier.value.email != email) {
              this.accountService.logout();
            }
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.translate.get('erLiepIetsFout').subscribe((text: string) => { this.errorMessage = text });
        }
      );
  }

  serverSideValidateUsername(
    checkAvailabilityFn: (n: string) => Observable<boolean>
  ): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return checkAvailabilityFn(control.value).pipe(
        map(available => {
          if (control.value == this.gebruiker.email) {
            return null;
          };
          if (available) {
            return null;
          }
          return { userAlreadyExists: true };
        })
      );
    };

  }

}


