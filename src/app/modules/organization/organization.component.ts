import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { UserService } from './_services/user/user.service'

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  constructor(private http: HttpClient, public userService: UserService,) {}

  ngOnInit(): void {}
}
