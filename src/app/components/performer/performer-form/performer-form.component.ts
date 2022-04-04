import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import { Performer } from "../../../model/Performer";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'performer-form-component',
  templateUrl: './performer-form.component.html',
  styleUrls: ['./performer-form.component.css']
})
export class PerformerFormComponent implements OnInit {
  @Input() performer!: Performer;
  @Output() submitClicked = new EventEmitter();
  @Output() discardClicked = new EventEmitter();

  update: boolean = false;
  submitted:  boolean = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.performer.id) {
      this.update = true;
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
      title: 'Confirm',
      content: 'Are you sure you want to save this performer?',
      cancelOption: 'No',
      confirmOption: 'Yes'
    }} );
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.submitForm();
      }
    });
  }

  submitForm() {
    this.submitClicked.emit(this.performer);
  }

  resetForm() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
        title: 'Confirm',
        content: 'Are you sure you want to reset these fields?',
        cancelOption: 'No',
        confirmOption: 'Yes'
      }});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.performer.name = "";
        this.performer.age = undefined;
        this.performer.style = "";
      }
    });
  }

  discardForm() {
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
