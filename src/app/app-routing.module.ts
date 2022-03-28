import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PerformerListComponent} from "./components/performer-list/performer-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/performers', pathMatch: 'full' },
  { path: 'performers', component: PerformerListComponent },
  { path: '**', component: NotFoundComponent},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    [RouterModule]
  ]
})
export class AppRoutingModule { }
