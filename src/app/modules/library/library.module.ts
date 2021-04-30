import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { TranslationModule } from '../i18n/translation.module'
import { LayoutModule } from 'src/app/pages/layout.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LibraryRoutingModule } from './library-routing.module'
import { LibraryComponent } from './library.component'
import { RouterModule } from '@angular/router'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTreeModule } from '@angular/material/tree'
import { routes } from 'src/app/app-routing.module'
import { CoreModule } from 'src/app/_metronic/core'
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module'
import { OverviewItemComponent } from './overview/item/overview-item.component'
import { OverviewBookComponent } from './overview/book/overview-book.component'
import { CreateItemComponent } from './create/item/create-item.component'
import { CreateBookComponent } from './create/book/create-book.component'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { MarkAsteriskDirective } from './directives/mark-asterisk.directive'
import { OverviewComponent } from './loan/overview/overview.component'
import { PositivePipe } from './pipes/positive.pipe'
import { AddLoanComponent } from './loan/new-loan/add-loan.component';
import { LoanDetailsComponent } from './loan/new-loan/loan-details/loan-details.component';
import { ReturnDetailsComponent } from './loan/new-loan/return-details/return-details.component';
import { SignOffComponent } from './loan/new-loan/sign-off/sign-off.component'

@NgModule({
  declarations: [
    LibraryComponent,
    OverviewItemComponent,
    OverviewBookComponent,
    CreateItemComponent,
    CreateBookComponent,
    MarkAsteriskDirective,
    OverviewComponent,
    AddLoanComponent,
    PositivePipe,
    LoanDetailsComponent,
    ReturnDetailsComponent,
    SignOffComponent,        
  ],
  imports: [
    CommonModule,

    // material modules
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDividerModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    MatTreeModule,
    MatButtonToggleModule,
    GeneralModule,

    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslationModule,
    LibraryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    NgxDropzoneModule,
  ],
  providers: [DatePipe],
})
export class LibraryModule {}
