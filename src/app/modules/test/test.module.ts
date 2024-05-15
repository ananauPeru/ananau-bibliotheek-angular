import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TestComponent } from './test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../i18n/translation.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TestListComponent } from './test-list/test-list.component';
import { TestRoutingModule } from './test-routing.module';
import { CreateTestComponent } from './create-test/create-test.component';
import { OverviewTestComponent } from './overview-test/overview-test.component';
import { ShareModalComponent } from './components/share-modal/share-modal.component';
import { FillInTestComponent } from './fill-in-test/fill-in-test.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { OverviewSubmissionTestComponent } from './overview-submission-test/overview-submission-test.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    TestRoutingModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    NgxDropzoneModule,
  ],
  declarations: [TestComponent, TestListComponent, CreateTestComponent, OverviewTestComponent, ShareModalComponent, FillInTestComponent, RadioButtonComponent, OverviewSubmissionTestComponent],
  providers: [DatePipe, AsyncPipe],
})
export class TestModule { }
