import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';
import {ActivatedRoute} from "@angular/router";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

import {Concert} from "../../../model/Concert";
import {ConcertService} from "../../../services/concert.service";
import {Review} from "../../../model/Review";
import {ReviewService} from "../../../services/review.service";
import {CommonMethodsService} from "../../../services/common-methods.service";

@Component({
  selector: 'app-concert-list',
  templateUrl: './concert-list.component.html',
  styleUrls: ['./concert-list.component.css']
})
export class ConcertListComponent implements OnInit {
  concerts: Concert[] = [];
  addClicked: boolean = false;
  concert: Concert = {};
  redirected: boolean = false;
  showsPastConcerts: boolean = false;
  showsFutureConcerts: boolean = false

  constructor(
    private concertService: ConcertService,
    private reviewService: ReviewService,
    public methodsService: CommonMethodsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.methodsService.hasRoute('/')) {
      this.showUpcomingConcerts();
    }
    const performerId = Number((this.route.snapshot.paramMap.get('performer-id')));
    const concertId = Number((this.route.snapshot.paramMap.get('concert-id')));
    if (performerId) {
      this.redirected = true;
      this.getConcertsByPerformer(performerId);
    }
    if (concertId) {
      this.redirected = true;
      this.getConcertById(concertId);
    }
  }

  addConcert(): void {
    this.addClicked = !this.addClicked;
  }

  discardForm(): void {
    this.addClicked = false;
  }

  getConcertsByPerformer(id: number): void {
    this.concertService.getConcertsByPerformer(id).subscribe(concerts => {
      this.concerts = concerts
    });
  }

  getConcertById(id: number): void {
    this.concertService.getConcertById(id).subscribe(c => this.concerts.push(c));
  }

  showUpcomingConcerts(): void {
    this.showsFutureConcerts = true;
    this.showsPastConcerts = false;
    this.concertService.getFutureConcerts().subscribe(concerts => {
      if (this.methodsService.hasRoute('/')) {
        concerts.sort((c1: Concert, c2: Concert) => this.methodsService.compareTwoDates(c1.day!, c2.day!));
        this.concerts = concerts.splice(0, 5);
        return;
      }
      this.concerts = concerts
    });
  }

  showPastConcerts(): void {
    this.showsPastConcerts = true;
    this.showsFutureConcerts = false;
    this.concertService.getPastConcerts().subscribe(concerts => this.concerts = concerts);
  }

  saveConcert(newConcert: Concert): void {
    this.addClicked = false;
    this.concertService.createConcert(newConcert).subscribe((response) => {
      if (!response) {
        M.toast({html: `Concert on ${newConcert.day} saved`, classes: 'rounded green'});
        this.addConcertToList(newConcert);
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

  saveReview(newReview: Review): void {
    this.reviewService.createReview(newReview).subscribe((response) => {
      if (!response.status) {
        M.toast({html: `Review by ${newReview.authorName} saved`, classes: 'rounded green'})
        this.checkWhichConcertsToShow();
      } else {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Error',
            error: response.error,
            confirmOption: 'Ok'
          }
        });
      }
    });
  }

  updateConcert(updatedConcert: Concert): void {
    this.concertService.updateConcert(updatedConcert).subscribe((response) => {
      if (!response) {
        M.toast({html: `Concert on ${updatedConcert.day} updated`, classes: 'rounded green'});
        this.checkWhichConcertsToShow();
      } else {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }
        });
      }
    });
  }

  checkWhichConcertsToShow() {
    if (this.showsFutureConcerts) {
      this.showUpcomingConcerts();
    }
    if (this.showsPastConcerts) {
      this.showPastConcerts()
    }
  }

  deleteConcert(concertId: number): void {
    this.concertService.deleteConcert(concertId).subscribe((response) => {
      if (!response) {
        let concert = this.concerts.find(c => c.id == concertId);
        if (concert) {
          M.toast({html: `Concert on ${concert.day} deleted`, classes: 'rounded red'})
        }
        this.concerts = this.concerts.filter(c => c.id !== concertId);
      } else {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Error',
            error: 'Could not delete review',
            confirmOption: 'Ok'
          }
        });
      }
    });
  }

  addConcertToList(concert: Concert) {
    if (this.methodsService.concertInFuture(concert.day!) && this.showsFutureConcerts) {
      this.concerts.push(concert);
    }
    if (!this.methodsService.concertInFuture(concert.day!) && this.showsPastConcerts) {
      this.concerts.push(concert);
    }
  }
}
