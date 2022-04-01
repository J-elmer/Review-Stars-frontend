import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

import {Review} from "../../../model/Review";
import {ReviewService} from "../../../services/review.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [];
  addClicked: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getReviews();
  }

  addReview(): void {
    this.addClicked = !this.addClicked;
  }

  discardForm(): void {
    this.addClicked = false;
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  getReviews(): void {
    this.reviewService.getReviews().subscribe(reviews => this.reviews = reviews);
  }

  saveReview(newReview: Review): void {
    this.addClicked = false;
    this.reviewService.createReview(newReview).subscribe((response) => {
      if (!response) {
        this.reviews.push(newReview);
        M.toast({html: `Review by ${newReview.authorName} saved`, classes: 'rounded green'})
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response,
            confirmOption: 'Ok'
          }});
      }
    });
  }

  updateReview(updatedReview: Review): void {
    this.reviewService.updateReview(updatedReview).subscribe((response) => {
      if (!response) {
        M.toast({html: `Review by ${updatedReview.authorName} updated`, classes: 'rounded green'});
        return;
      } else {
        this.dialog.open(ConfirmationDialogComponent, {data: {
            title: 'Error',
            error: response,
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
}
