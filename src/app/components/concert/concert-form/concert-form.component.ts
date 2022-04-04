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
  @Input() concert!: Concert;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted: boolean = false;
  performerId?: number;
  performers: Performer[] = [];

  constructor(
    public dialog: MatDialog,
    private performerService: PerformerService,
  ) { }

  ngOnInit(): void {
    if (this.concert.id) {
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
      this.concert.performerId = this.performerId;
    }
    this.submitClicked.emit(this.concert);
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
        this.concert.performerId = undefined;
        this.concert.stage = "";
        this.concert.day = undefined;
        this.concert.beginTime = undefined;
        this.concert.endTime = undefined;
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
