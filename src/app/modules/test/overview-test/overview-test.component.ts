import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../_services/test/test.service';
import { TestModel } from '../_models/test/test.model';

@Component({
  selector: "app-overview-test",
  templateUrl: "./overview-test.component.html",
  styleUrls: ["./overview-test.component.scss"],
})
export class OverviewTestComponent implements OnInit {
  test: TestModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.getTestDetails();
  }

  getTestDetails() {
    const testId = this.route.snapshot.params['id'];
    this.testService.getTestById$(testId, 1).subscribe(
      (test: TestModel) => {
        this.test = test;
      },
      error => {
        console.error('Error fetching test details:', error);
      }
    );
  }

  getTotalQuestions(): number {
    let totalQuestions = 0;
    this.test.sections.forEach(section => {
      totalQuestions += section.questions.length;
    });
    return totalQuestions;
  }
}