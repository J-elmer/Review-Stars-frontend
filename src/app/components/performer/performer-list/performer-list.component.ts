import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import {Performer} from "../../../model/Performer";
import {PerformerService} from "../../../services/performer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  performers: Performer[] = [];
  addClicked: boolean = false;
  performer: Performer = {};
  redirected: boolean = false;

  constructor(
    private performerService: PerformerService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = Number((this.route.snapshot.paramMap.get('id')));
    if (id) {
      this.redirected = true;
      this.getPerformer(id);
    }
    if (!id) {
      this.getPerformers();
    }
  }

  addPerformer(): void {
    this.addClicked = !this.addClicked;
  }

  discardForm(): void {
    this.addClicked = false;
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  getPerformers(): void {
    this.redirected = false;
    this.performerService.getPerformers().subscribe(performers => this.performers = performers);
  }

  getPerformer(performerId: number): void {
    this.performerService.getPerformerById(performerId).subscribe(p => this.performers.push(p));
  }

  savePerformer(newPerformer: Performer) {
    this.addClicked = false;
    this.performerService.createPerformer(newPerformer).subscribe((response) => {
      if (!response) {
        this.performers.push(newPerformer);
        M.toast({html: `Performer ${newPerformer.name} saved`, classes: 'rounded green'})
        this.getPerformers();
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }});
      }
    });
  }

  updatePerformer(updatedPerformer: Performer): void {
    this.performerService.updatePerformer(updatedPerformer).subscribe((response) => {
      if (!response) {
        M.toast({html: `Performer ${updatedPerformer.name} updated`, classes: 'rounded green'});
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

  deletePerformer(performerId: number): void {
    this.performerService.deletePerformer(performerId)
      .subscribe((response) => {
        if (!response) {
          let performer = this.performers.find(p => p.id == performerId);
          if (performer) {
            M.toast({html: `Performer ${performer.name} deleted`, classes: 'rounded red'})
          }
          this.performers = this.performers.filter(p => p.id !== performerId);
        } else {
          this.dialog.open(ConfirmationDialogComponent, {data: {
              title: 'Error',
              error: 'Could not delete performer',
              confirmOption: 'Ok'
            }});
        }
      });
  }
}
