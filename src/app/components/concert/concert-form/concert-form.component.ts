import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

import {Concert} from "../../../model/Concert";
import {Performer} from "../../../model/Performer";
import {PerformerService} from "../../../services/performer.service";

@Component({
  selector: 'app-concert-form-component',
  templateUrl: './concert-form.component.html',
  styleUrls: ['./concert-form.component.css']
})
export class ConcertFormComponent implements OnInit {
  @Input() concert?: Concert;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted: boolean = false;
  performerId?: number;
  stage?: string;
  day?: Date;
  beginTime?: Date;
  endTime?: Date;
  performers: Performer[] = [];
  performer?: Performer;

  constructor(
    public dialog: MatDialog,
    private performerService: PerformerService,
  ) { }

  ngOnInit(): void {
    if (this.concert) {
      this.update = true;
      this.performerId = this.concert.performerId;
    }
    this.getPerformers();
  }

  getPerformers(): void {
    this.performerService.getPerformers().subscribe(performers => {
      this.performers = performers;
    });
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to save this concert?',
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
      let newConcert: Concert = {
        performerId: this.performerId!,
        stage: this.stage!,
        day: this.day!,
        beginTime: this.beginTime!,
        endTime: this.endTime!,
      }
      this.submitClicked.emit(newConcert)
    } else {
      this.submitClicked.emit(this.concert);
    }
  }

  resetForm(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to reset these fields?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.performerId = undefined;
        this.stage = "";
        this.day = undefined;
        this.beginTime = undefined;
        this.endTime = undefined;
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
