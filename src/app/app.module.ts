import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PerformerListComponent } from './components/performer-list/performer-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerformerDetailComponent } from './components/performer-detail/performer-detail.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { PerformerFormComponent } from './components/PefromerFormComponent/performer-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    PerformerListComponent,
    NavbarComponent,
    NotFoundComponent,
    PerformerDetailComponent,
    AdminPageComponent,
    PerformerFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
