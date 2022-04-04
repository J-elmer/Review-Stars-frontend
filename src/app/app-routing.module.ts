import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {PerformerListComponent} from "./components/performer/performer-list/performer-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {ConcertListComponent} from "./components/concert/concert-list/concert-list.component";
import {ReviewListComponent} from "./components/review/review-list/review-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/performers', pathMatch: 'full' },
  { path: 'performers', component: PerformerListComponent },
  { path: 'performers/:id', component: PerformerListComponent },
  { path: 'concerts', component: ConcertListComponent },
  { path: 'concerts/by-performer/:performer-id', component: ConcertListComponent },
  { path: 'concerts/by-concert/:concert-id', component: ConcertListComponent },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'reviews/by-concert/:concert-id', component: ReviewListComponent },
  { path: 'admin', component: AdminPageComponent},
  { path: '**', component: NotFoundComponent},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [
    [RouterModule]
  ]
})
export class AppRoutingModule { }
