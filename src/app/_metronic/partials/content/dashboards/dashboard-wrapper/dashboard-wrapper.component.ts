import { Component, OnInit } from '@angular/core'
import { LayoutService } from '../../../../core'

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
})
export class DashboardWrapperComponent implements OnInit {
  demo: string
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    console.log('Dashboard wrapper')
    this.demo = this.layout.getProp('demo')
    console.log(this.demo)
  }
}
