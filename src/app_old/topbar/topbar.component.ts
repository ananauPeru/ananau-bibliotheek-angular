import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Gebruiker } from '../models/gebruiker.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  public aangemelde: Gebruiker;

  constructor(public route: ActivatedRoute, public router: Router, private accountService: AccountService) { }

  ngOnInit() {
    console.log();
    this.accountService.huidigeGebruiker.subscribe(t => {
      this.aangemelde = t;
    });
  }

  public afmelden(): void {
    this.accountService.logout();
    this.router.navigate([`/login`])
  }

}
