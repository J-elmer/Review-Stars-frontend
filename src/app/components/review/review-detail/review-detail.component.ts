import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

import {Review} from "../../../model/Review";
import {Concert} from "../../../model/Concert";
import {Performer} from "../../../model/Performer";
import {ConcertService} from "../../../services/concert.service";
import {PerformerService} from "../../../services/performer.service";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  @Input() review!: Review;
  @Output() deleteClicked = new EventEmitter();
  @Output() updateReviewClicked = new EventEmitter();

  updateClicked: boolean = false;
  performer!: Performer;
  concert!: Concert;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private performerService: PerformerService,
    private concertService: ConcertService,
  ) { }

  ngOnInit(): void {
    if (this.review.performerId && this.review.concertId) {
      this.getPerformer(this.review.performerId);
      this.getConcert(this.review.concertId);
    }
  }

  getPerformer(performerId: number): void {
    this.performerService.getPerformerById(performerId).subscribe(p => this.performer = p);
  }

  getConcert(concertId: number): void {
    this.concertService.getConcertById(concertId).subscribe(c => this.concert = c);
  }

  showConcert(): void {
    console.log("Concert");
  }

  updateReview(): void {
    this.updateClicked = !this.updateClicked;
  }

  saveUpdateReview(updatedReview: Review): void {
    this.updateClicked = false;
    this.updateReviewClicked.emit(updatedReview);
  }

  deleteReview(reviewId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to delete this review?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }} );
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteClicked.emit(reviewId);
      }
    });
  }

  discardForm(): void {
    this.updateClicked = false;
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
}
