import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.scss']
})
export class RegistreerComponent implements OnInit {

  public registreerFormulier: FormGroup;
  public errorMessage: string;
  public loading: Boolean;

  constructor(public router: Router, private fb: FormBuilder, private accountService: AccountService, public translate: TranslateService) { }

  ngOnInit() {
    this.registreerFormulier = this.fb.group({
      voornaam: ['', [Validators.required]],
      achternaam: ['', [Validators.required]],
      telefoon: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email],
        serverSideValidateUsername(this.accountService.checkUserNameAvailability)],
      geboorteDatum: ['', [Validators.required]],
      wachtwoord: ['', Validators.required],
      herhaalWachtwoord: ['', [Validators.required]],
    },
      {
        validator: this.MustMatch('wachtwoord', 'herhaalWachtwoord'),
      })
  }

  registreerNieuweGebruiker() {
    this.accountService
      .registreer(
        this.registreerFormulier.value.voornaam,
        this.registreerFormulier.value.achternaam,
        this.registreerFormulier.value.telefoon,
        this.registreerFormulier.value.email,
        this.registreerFormulier.value.wachtwoord,
        this.registreerFormulier.value.herhaalWachtwoord,
        this.registreerFormulier.value.geboorteDatum
      )
      .subscribe(
        val => {
          this.loading = true;
          if (val) {
            if (this.accountService.redirectUrl) {
              this.router.navigateByUrl(this.accountService.redirectUrl);
              this.accountService.redirectUrl = undefined;
            } else {
              this.router.navigate(["/overview"]);
            }
          }
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMessage = this.translate.instant('errorTijdensInloggen', {email: this.registreerFormulier.value.email, error:err.error.message});
          } else {
            this.errorMessage = this.translate.instant('errorTijdensInloggen', {email: this.registreerFormulier.value.email, error:err.status});
          }
        }
      );
  }

  private MustMatch(controlString: string, confirmString: string): void | any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlString];
      const matchingControl = formGroup.controls[confirmString];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

