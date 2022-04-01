import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

import {Review} from "../../../model/Review";
import {Performer} from "../../../model/Performer";
import {Concert} from "../../../model/Concert";
import {PerformerService} from "../../../services/performer.service";
import {ConcertService} from "../../../services/concert.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() review?: Review;
  @Input() concert!: Concert;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted: boolean = false;
  performerId?: number;
  authorName?: string;
  numberOfStars?: number;
  reviewText?: string;
  performer!: Performer;

  constructor(
    private dialog: MatDialog,
    private performerService: PerformerService,
    private concertService: ConcertService,
  ) { }

  ngOnInit(): void {
    this.getPerformer();
    if (this.review) {
      this.update = true;
      this.performerId = this.review.performerId;
    }
  }

  getPerformer() {
    if (this.review) {
      this.performerService.getPerformerById(this.review.performerId!).subscribe(p => {
        this.performer = p;
      });
      this.concertService.getConcertById(this.review.concertId).subscribe(c => {
        this.concert = c;
      })
    }
    if (this.concert) {
      this.performerService.getPerformerById(this.concert.performerId!).subscribe(p => {
        this.performer = p;
      });
    }
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to save this review?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }} );
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.submitForm();
      }
    });
  }

  submitForm(): void {
    if (!this.update) {
      let newReview: Review = {
        concertId: this.concert.id!,
        performerId: this.performerId!,
        authorName: this.authorName!,
        numberOfStars: this.numberOfStars!,
        reviewText: this.reviewText!,
      }
      this.submitClicked.emit(newReview)
    } else {
      this.submitClicked.emit(this.review);
    }
  }

  resetForm(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm',
        content: 'Are you sure you want to reset these fields?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.performerId = undefined;
        this.authorName = "";
        this.numberOfStars = undefined;
        this.reviewText = "";
      }
    });
  }

  discardForm(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to discard these changes?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.discardClicked.emit();
      }
    });
  }
}
