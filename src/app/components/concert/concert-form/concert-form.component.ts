import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

import {Concert} from "../../../model/Concert";
import {Performer} from "../../../model/Performer";
import {PerformerService} from "../../../services/performer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  concertForm!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private performerService: PerformerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.concert.id) {
      this.update = true;
      this.performerId = this.concert.performerId;
    }
    this.getPerformers();
  }

  buildForm() {
    this.concertForm = this.formBuilder.group({
      id: [this.concert.id ? this.concert.id : undefined],
      performerId: [this.concert.performerId, [
        Validators.required
      ]],
      day: [this.concert.day, [
        Validators.required
      ]],
      stage: [this.concert.stage, [
        Validators.required,
      ]],
      beginTime: [this.concert.beginTime, [
        Validators.required
      ]],
      endTime: [this.concert.endTime, [
        Validators.required
      ]],
    });
  }

  getPerformers(): void {
    this.performerService.getPerformers().subscribe(performers => {
      this.performers = performers;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.concertForm.invalid) {
      setTimeout(() => this.submitted = false, 10000);
      return;
    }
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
      if (result == false) {
        this.submitted = false;
      }
    });
  }

  submitForm(): void {
    console.log(this.concertForm.value);
    this.submitClicked.emit(this.concertForm.value);
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
        this.concertForm.reset();
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
