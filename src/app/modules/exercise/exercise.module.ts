import { NgModule } from "@angular/core";
import { AsyncPipe, CommonModule, DatePipe } from "@angular/common";
import { ExerciseComponent } from "./exercise.component";
import { ExerciseRoutingModule } from "./exercise-routing.module";
import { ExerciseListComponent } from "./exercise-list/exercise-list.component";
import { CreateExerciseComponent } from "./create-exercise/create-exercise.component";
import { OverviewExerciseComponent } from "./overview-exercise/overview-exercise.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslationModule } from "../i18n/translation.module";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "@angular/cdk/layout";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDropzoneModule } from "ngx-dropzone";
import { SubmissionListComponent } from "./submission-list/submission-list.component";
import { OverviewSubmissionComponent } from "./overview-submission/overview-submission.component";
import { SharedExercisesListComponent } from "./shared-exercises-list/shared-exercises-list.component";
import { AssignModalComponent } from "./components/assign-modal/assign-modal.component";
import { ExerciseDocumentationComponent } from './documentation/exercise-documentation/exercise-documentation.component';

@NgModule({
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    NgxDropzoneModule,
  ],
  declarations: [
    ExerciseComponent,
    ExerciseListComponent,
    CreateExerciseComponent,
    OverviewExerciseComponent,
    SubmissionListComponent,
    OverviewSubmissionComponent,
    SharedExercisesListComponent,
    AssignModalComponent,
    ExerciseDocumentationComponent,
  ],
  providers: [DatePipe, AsyncPipe],
})
export class ExerciseModule {}
