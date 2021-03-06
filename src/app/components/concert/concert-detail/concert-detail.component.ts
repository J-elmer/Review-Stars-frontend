import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import { Concert } from "../../../model/Concert";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {Performer} from "../../../model/Performer";
import { PerformerService} from "../../../services/performer.service";
import {Review} from "../../../model/Review";
import {ReviewService} from "../../../services/review.service";
import {CommonMethodsService} from "../../../services/common-methods.service";

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {
  @Input() concert!: Concert;
  @Input() updatedConcert!: Concert;
  @Input() admin!: boolean;
  @Output() deleteClicked = new EventEmitter();
  @Output() updateConcertClicked = new EventEmitter();
  @Output() addReviewClicked = new EventEmitter();

  updateClicked: boolean = false;
  performer!: Performer;
  addClicked: boolean = false;
  review: Review = {};
  averageStars?: number;
  hasReviews?: boolean;
  concertIsInFuture: boolean = false;

  constructor(
    public dialog: MatDialog,
    private performerService: PerformerService,
    private reviewService: ReviewService,
    private methodsService: CommonMethodsService,
  ) { }

  ngOnInit(): void {
    this.getPerformer();
    if (!this.methodsService.concertInFuture(this.concert.day!)) {
      this.getAverageStars(this.concert.id!);
    }
    if (this.methodsService.concertInFuture(this.concert.day!)) {
      this.concertIsInFuture = true;
    }
  }

  getPerformer() {
    if (this.concert.performerId) {
      this.performerService.getPerformerById(this.concert.performerId).subscribe(result => this.performer = result);
    }
  }

  addReview(): void {
    if (this.updateClicked) {
      this.updateClicked = false;
    }
    this.addClicked = !this.addClicked;
  }

  updateConcert(): void {
    if (this.addClicked) {
      this.addClicked = false;
    }
    this.updateClicked = !this.updateClicked;
  }

  saveReview(newReview: Review): void {
    this.addClicked = false;
    this.addReviewClicked.emit(newReview);
  }

  saveUpdatedConcert(updatedConcert: Concert): void {
    this.updateClicked = false;
    this.updateConcertClicked.emit(updatedConcert);
  }

  deleteConcert(concertId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to delete this concert? Warning: if this concert has reviews, these will also be deleted.',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteClicked.emit(concertId);
      }
    });
  }

  getAverageStars(concertId: number) {
    this.reviewService.getAverageStars(concertId).subscribe(s => {
      if (isNaN(s)) {
        this.hasReviews = false;
        return;
      }
      this.averageStars = s;
      this.hasReviews = true;
    });
  }

  discardForm(): void {
    this.addClicked = false;
    this.updateClicked = false;
  }
}
