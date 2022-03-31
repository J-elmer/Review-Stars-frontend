import {Component, Input, OnInit} from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import { Performer } from "../../model/Performer";
import { PerformerService} from "../../services/performer.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  @Input() newPerformer!: Performer;
  @Input() updatedPerformer!: Performer;

  performers: Performer[] = [];
  addClicked: boolean = false;

  constructor(
    private performerService: PerformerService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPerformers();
  }

  getPerformers() {
    this.performerService.getPerformers().subscribe(performers => this.performers = performers);
  }

  addPerformer() {
    this.addClicked = !this.addClicked;
  }

  discardForm() {
    this.addClicked = false;
  }

  savePerformer(newPerformer: Performer) {
    this.addClicked = false;
    this.performerService.createPerformer(newPerformer).subscribe((response) => {
      if (!response) {
        this.performers.push(newPerformer);
        M.toast({html: `Performer ${newPerformer.name} saved`, classes: 'rounded green'})
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }});
      }
    });
  }

  updatePerformer(updatedPerformer: Performer) {
    this.performerService.updatePerformer(updatedPerformer).subscribe((response) => {
      if (!response) {
        M.toast({html: `Performer ${updatedPerformer.name} updated`, classes: 'rounded green'})
        return;
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }});
        this.getPerformers();
      }
    });
  }

  deletePerformer(performerId: number) {
    this.performerService.deletePerformer(performerId)
      .subscribe((response) => {
        if (!response) {
          let performer = this.performers.find(p => p.id == performerId);
          if (performer) {
            M.toast({html: `Performer ${performer.name} deleted`, classes: 'rounded red'})
          }
          this.performers = this.performers.filter(p => p.id !== performerId);
        }
      });
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
