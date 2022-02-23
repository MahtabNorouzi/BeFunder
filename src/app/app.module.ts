import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
  //MatMenuModule
} from '@angular/material';
import { AddProjectComponent } from './projects/borrower/add-project/add-project.component';
import {ProjectService} from './core/services/project.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component'
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule, StyleUtils, StylesheetMap, LayoutStyleBuilder, MediaMarshaller, LayoutAlignStyleBuilder, FlexStyleBuilder } from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatMenuModule} from '@angular/material/menu'; 
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatIconModule} from '@angular/material/icon';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { InvestmentContractDialogComponent } from './investment-contract-dialog/investment-contract-dialog.component';
import { InvestmentDialogComponent } from './investment-dialog/investment-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { AuthModule } from './auth/auth.module';
import { BorrowerProjectsComponent } from './projects/borrower/borrower-projects/borrower-projects.component';
import { BorrowerMainComponent } from './projects/borrower/borrower-main/borrower-main.component';
import { ApproveProjectsComponent } from './projects/buyer-projects/approve-projects/approve-projects.component';
import { PayProjectsComponent } from './projects/buyer-projects/pay-projects/pay-projects.component';
import { BuyerMainComponent } from './projects/buyer-projects/buyer-main/buyer-main.component';


@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    ListProjectsComponent,
    HomeComponent,
    MenuComponent,
    InvestmentContractDialogComponent,
    InvestmentDialogComponent,
    FooterComponent,
    ProjectDetailComponent,
    ApproveProjectsComponent,
    BorrowerProjectsComponent,
    BorrowerMainComponent,
    ApproveProjectsComponent,
    PayProjectsComponent,
    BuyerMainComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    AppRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatMenuModule,
    MatCarouselModule.forRoot(),
    MaterialFileInputModule,
    MatFileUploadModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    MatIconModule,
    AuthModule
  ],
  providers: [ProjectService, 
              StyleUtils,
              StylesheetMap,
              LayoutStyleBuilder,
              MediaMarshaller,
              LayoutAlignStyleBuilder,
              FlexStyleBuilder
            ],
  bootstrap: [AppComponent],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
  entryComponents: [InvestmentContractDialogComponent,
                   InvestmentDialogComponent]
  
})
export class AppModule { }
