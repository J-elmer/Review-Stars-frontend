import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import { Concert } from "../../../model/Concert";
import { ConcertService } from "../../../services/concert.service";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import { MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];
  addClicked: boolean = false;

  constructor(
    private concertService: ConcertService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getConcerts();
  }

  addConcert(): void {
    this.addClicked = !this.addClicked;
  }

  discardForm(): void {
    this.addClicked = false;
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  getConcerts(): void {
    this.concertService.getConcerts().subscribe(concerts => this.concerts = concerts);
  }

  saveConcert(newConcert: Concert): void {
    this.addClicked = false;
    this.concertService.createConcert(newConcert).subscribe((response) => {
      if (!response) {
        this.concerts.push(newConcert);
        M.toast({html: `Concert on ${newConcert.day} saved`, classes: 'rounded green'})
      } else {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }
        });
      }
    })
  }

  updateConcert(updatedConcert: Concert): void {
    this.concertService.updateConcert(updatedConcert).subscribe((response) => {
      if (!response) {
        M.toast({html: `Concert on ${updatedConcert.day} updated`, classes: 'rounded green'});
        return;
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }});
        this.getConcerts();
      }
    });
  }

  deleteConcert(concertId: number): void {
    this.concertService.deleteConcert(concertId).subscribe((response) => {
      if (!response) {
        let concert = this.concerts.find(c => c.id == concertId);
        if (concert) {
          M.toast({html: `Concert on ${concert.day} deleted`, classes: 'rounded red'})
        }
        this.concerts = this.concerts.filter(c => c.id !== concertId);
      }
    });
  }
}
