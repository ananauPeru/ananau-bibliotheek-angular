import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { OverviewExerciseComponent } from './overview-exercise/overview-exercise.component';

@NgModule({
  imports: [
    CommonModule,
    ExerciseRoutingModule,
  ],
  declarations: [ExerciseComponent, ExerciseListComponent, CreateExerciseComponent, OverviewExerciseComponent],
})
export class ExerciseModule { }
