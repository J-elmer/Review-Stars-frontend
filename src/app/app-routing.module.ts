import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {PerformerListComponent} from "./components/performer-list/performer-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {PerformerFormComponent} from "./components/PefromerFormComponent/performer-form.component";

const routes: Routes = [
  { path: '', redirectTo: '/performers', pathMatch: 'full' },
  { path: 'performers', component: PerformerListComponent },
  { path: 'admin', component: AdminPageComponent},
  { path: 'newPerformer', component: PerformerFormComponent},
  { path: 'updatePerformer/:id', component: PerformerFormComponent},
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
