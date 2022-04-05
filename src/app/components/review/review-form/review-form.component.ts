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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() review!: Review;
  @Input() concert!: Concert;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted: boolean = false;
  performerId?: number;
  performer!: Performer;
  reviewForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private performerService: PerformerService,
    private concertService: ConcertService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getPerformer();
    if (this.review.id) {
      this.update = true;
      this.performerId = this.review.performerId;
      this.buildUpdateForm();
    } else {
      this.buildForm();
    }
  }

  buildForm() {
    this.reviewForm = this.formBuilder.group({
      performerId: [this.performerId!],
      concertId: [this.concert.id!],
      authorName: [this.review.authorName, [
        Validators.required
      ]],
      numberOfStars: [this.review.numberOfStars, [
        Validators.min(1),
        Validators.max(5),
        Validators.required,
      ]],
      reviewText: [this.review.reviewText, [
        Validators.required,
        Validators.maxLength(150)
      ]],
    });
  }

  buildUpdateForm() {
    this.reviewForm = this.formBuilder.group({
      id: [this.review.id],
      performerId: [this.review.performerId!],
      concertId: [this.review.concertId!],
      authorName: [this.review.authorName, [
        Validators.required
      ]],
      numberOfStars: [this.review.numberOfStars, [
        Validators.min(1),
        Validators.max(5),
        Validators.required,
      ]],
      reviewText: [this.review.reviewText, [
        Validators.required,
        Validators.maxLength(150)
      ]],
    });
  }

  getPerformer() {
    if (this.review?.performerId && this.review.concertId) {
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
    this.submitted = true;
    if (this.reviewForm.invalid) {
      setTimeout(() => this.submitted = false, 10000);
      return;
    }
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
      if (result == false) {
        this.submitted = false;
      }
    });
  }

  submitForm(): void {
    if(!this.review.concertId) {
      this.review.concertId = this.concert.id;
    }
    this.submitClicked.emit(this.reviewForm.value);
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
        this.review.authorName = "";
        this.review.numberOfStars = undefined;
        this.review.reviewText = "";
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
