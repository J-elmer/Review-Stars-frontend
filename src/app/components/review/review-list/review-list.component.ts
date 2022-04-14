import {Component, Input, OnInit} from '@angular/core';
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
  @Input() searchResult: Review[] = [];
  reviews: Review[] = [];
  addClicked: boolean = false;
  redirected: boolean = false;
  admin: boolean = false;
  displayedOnHomePage: boolean = false;
  searched: boolean = false;
  sortClicked: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
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
    if (this.methodsService.hasRoute('/')) {
      this.displayedOnHomePage = true;
    }
    if (this.methodsService.redirectedFromAdmin(this.route)) {
      this.admin = true;
    }
    if (this.methodsService.hasRoute('/admin')) {
      this.admin = true;
    }
  }

  checkSearchResults(): void {
    if (this.searchResult.length > 0){
      this.reviews = this.searchResult;
      this.searched = true;
    }
  }

  checkRouteParams(): void {
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
      reviews.sort((r1, r2) => this.compareTwoDates(r2.dateOfReview!, r1.dateOfReview!))
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
          M.toast({html: `Review by ${review.authorName} deleted`, classes: 'rounded green'})
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

  sortByStars() {
    if (!this.sortClicked) {
      this.reviews = this.reviews.sort((r1, r2) => r2.numberOfStars! - r1.numberOfStars!);
      this.sortClicked = true;
      return;
    }
    if (this.sortClicked) {
      this.reviews = this.reviews.sort((r1, r2) => r1.numberOfStars! - r2.numberOfStars!);
      this.sortClicked = false;
    }
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
