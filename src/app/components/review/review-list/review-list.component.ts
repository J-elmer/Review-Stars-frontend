import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import {Review} from "../../../model/Review";
import {ReviewService} from "../../../services/review.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CommonMethodsService} from "../../../services/common-methods.service";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [];
  addClicked: boolean = false;
  redirected: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public methodsService: CommonMethodsService,
  ) { }

  ngOnInit(): void {
    const concertId = Number((this.route.snapshot.paramMap.get('concert-id')));
    const performerId = Number((this.route.snapshot.paramMap.get('performer-id')));
    if (concertId) {
      this.getReviewsOfConcert(concertId);
      this.redirected = true;
    }
    if (performerId) {
      this.getReviewsOfPerformer(performerId);
      this.redirected = true;
    }
    if (!concertId && !performerId) {
      this.getReviews();
    }
  }

  addReview(): void {
    this.addClicked = !this.addClicked;
  }

  discardForm(): void {
    this.addClicked = false;
  }

  getReviews(): void {
    this.redirected = false;
    this.reviewService.getReviews().subscribe(reviews =>  {
      reviews.sort((r1, r2) => this.compareTwoDates(r1.dateOfReview!, r2.dateOfReview!))
      if (this.methodsService.hasRoute('/')) {
        this.reviews = reviews.splice(0, 5);
        return;
      }
      this.reviews = reviews
    });
  }

  getReviewsOfConcert(concertId: number): void {
    this.reviewService.getReviewsByConcertId(concertId).subscribe(reviews => this.reviews = reviews);
  }

  getReviewsOfPerformer(performerId: number): void {
    this.reviewService.getReviewsByPerformer(performerId).subscribe(reviews => this.reviews = reviews);
  }

  updateReview(updatedReview: Review): void {
    this.reviewService.updateReview(updatedReview).subscribe((response) => {
      if (!response) {
        M.toast({html: `Review by ${updatedReview.authorName} updated`, classes: 'rounded green'});
        this.getReviews();
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response.error,
            confirmOption: 'Ok'
          }});
        this.getReviews();
      }
    });
  }

  deleteReview(reviewId: string): void {
    this.reviewService.deleteReview(reviewId).subscribe((response) => {
      if (!response) {
        let review = this.reviews.find(r => r.id == reviewId);
        if (review) {
          M.toast({html: `Review by ${review.authorName} deleted`, classes: 'rounded red'})
        }
        this.reviews = this.reviews.filter(r => r.id !== reviewId);
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: 'Could not delete review',
            confirmOption: 'Ok'
          }});
      }
    })
  }

  compareTwoDates(date: Date, otherDate: Date): number {
    if (new Date(date) > new Date(otherDate)) {
      return 1;
    }
    if (new Date(date) < new Date(otherDate)) {
      return -1;
    }
    return 0;
  }
}
