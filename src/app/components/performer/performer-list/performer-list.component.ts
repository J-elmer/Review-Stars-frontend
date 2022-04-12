import {Component, Input, OnInit} from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import {Performer} from "../../../model/Performer";
import {PerformerService} from "../../../services/performer.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CommonMethodsService} from "../../../services/common-methods.service";

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  @Input() searchResult: Performer[] = [];
  performers: Performer[] = [];
  addClicked: boolean = false;
  performer: Performer = {};
  redirected: boolean = false;
  admin: boolean = false;
  searched: boolean = false;

  constructor(
    private performerService: PerformerService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private methodsService: CommonMethodsService,
  ) { }

  ngOnInit(): void {
    this.checkRouteUser();
    this.checkSearchResults();
    if (this.searched) {
      return;
    }
    this.checkRouteParams();
  }

  checkRouteUser(): void {
    if (this.methodsService.redirectedFromAdmin(this.route)) {
      this.admin = true;
    }
    if (this.methodsService.hasRoute('/admin')) {
      this.admin = true;
    }
  }

  checkSearchResults(): void {
    if (this.searchResult.length > 0){
      this.performers = [];
      this.performers = this.searchResult;
      this.searched = true;
    }
  }

  checkRouteParams(): void {
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
        this.getPerformers();
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
        let performer = this.performers.find(p => p.id == performerId);
        if (!response) {
          if (performer) {
            M.toast({html: `Performer ${performer.name} deleted`, classes: 'rounded green'})
          }
          this.performers = this.performers.filter(p => p.id !== performerId);
        } else {
          if (performer) {
            M.toast({html: `Performer ${performer.name} could not be deleted, first delete associated concerts`, classes: 'rounded red'})
          }
        }
      });
  }
}
